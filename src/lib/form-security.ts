import { createHash } from 'node:crypto';
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, validateBasicInputs, validateFormTiming, validateHoneypot, validateRequestOrigin } from './security';

export type FormAction = 'inquiry' | 'po' | 'credit';
const MAX_BODY_BYTES = 64 * 1024;
const WINDOW_SECONDS = 600;
const LIMITS: Record<FormAction, number> = { inquiry: 5, po: 5, credit: 3 };

class SubmissionError extends Error {
    constructor(public status: number, message: string) { super(message); }
}

// INCR and expiry run atomically; counters are shared by all function instances.
const RATE_LIMIT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return count
`;

async function enforceRateLimit(ip: string, action: FormAction) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!url || !token || !url.startsWith('https://')) throw new Error('Rate limit configuration missing');
    const ipHash = createHash('sha256').update(ip).digest('hex');
    const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', RATE_LIMIT_SCRIPT, '1', `uf:forms:${action}:${ipHash}`, String(WINDOW_SECONDS)]),
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Rate limit service unavailable');
    const data = await response.json();
    if (data.error || !Number.isInteger(data.result) || data.result < 1) throw new Error('Invalid rate limit response');
    if (data.result > LIMITS[action]) throw new SubmissionError(429, 'Too many submissions. Please wait 10 minutes and try again.');
}

async function readBody(req: NextRequest): Promise<Record<string, unknown>> {
    if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
        throw new SubmissionError(415, 'Please submit the form as JSON.');
    }
    if (Number(req.headers.get('content-length')) > MAX_BODY_BYTES) throw new SubmissionError(413, 'Submission is too large.');
    if (!req.body) throw new SubmissionError(400, 'Missing submission.');
    const reader = req.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > MAX_BODY_BYTES) {
                await reader.cancel();
                throw new SubmissionError(413, 'Submission is too large.');
            }
            chunks.push(value);
        }
    } finally { reader.releaseLock(); }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new SubmissionError(400, 'Invalid submission.'); }
    if (!isRecord(body) || !validStructure(body)) throw new SubmissionError(400, 'Invalid submission structure.');
    return body;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validStructure(value: unknown, depth = 0): boolean {
    if (depth > 4) return false;
    if (Array.isArray(value)) return value.length <= 50 && value.every(entry => validStructure(entry, depth + 1));
    if (isRecord(value)) {
        const entries = Object.entries(value);
        return entries.length <= 80 && entries.every(([key, entry]) =>
            !['__proto__', 'constructor', 'prototype'].includes(key) && validStructure(entry, depth + 1));
    }
    return value === null || typeof value === 'boolean' || typeof value === 'number'
        || (typeof value === 'string' && value.length <= 10000);
}

export async function protectForm(req: NextRequest, action: FormAction): Promise<
    { body: Record<string, unknown>; response?: never } | { response: NextResponse; body?: never }
> {
    try {
        if (!validateRequestOrigin(req)) throw new SubmissionError(403, 'Invalid request origin.');
        const bot = await checkBotId({ advancedOptions: { checkLevel: 'basic' } });
        if (bot.isBot) throw new SubmissionError(403, 'Automated submission blocked.');
        const ip = getClientIp(req);
        await enforceRateLimit(ip, action);
        const body = await readBody(req);
        if (!validateHoneypot(body) || !validateFormTiming(body) || !validateBasicInputs(body)) {
            // Never claim an order was accepted or clear a customer's cart when it was filtered.
            throw new SubmissionError(400, 'Unable to accept this submission. Please review the form or contact us.');
        }
        return { body };
    } catch (error) {
        const expected = error instanceof SubmissionError;
        if (!expected) console.error('Form security service unavailable', { action });
        const status = expected ? error.status : 503;
        return { response: NextResponse.json({ error: expected ? error.message : 'Submissions are temporarily unavailable. Please try again shortly or call 406.727.4144.' }, {
            status,
            headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': String(WINDOW_SECONDS) } : {}) },
        }) };
    }
}
