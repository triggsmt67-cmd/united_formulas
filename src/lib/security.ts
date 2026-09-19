import type { NextRequest } from 'next/server';

export const HONEYPOT_FIELD_NAME = 'website_verify_field';
export const FORM_STARTED_FIELD_NAME = 'form_started_at';

export function getClientIp(req: NextRequest) {
    return (req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || req.headers.get('x-real-ip')
        || 'unknown').slice(0, 80);
}

export function validateRequestOrigin(req: NextRequest) {
    const origin = req.headers.get('origin');
    if (!origin) return false;
    try {
        const originUrl = new URL(origin);
        if (originUrl.origin !== origin) return false;
        const allowedOrigins = new Set([
            'https://unitedformulas.com',
            'https://www.unitedformulas.com',
            ...(process.env.FORM_ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean),
        ]);
        // Only this deployment's preview URL is trusted, never all *.vercel.app sites.
        if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
            allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
        }
        const isLoopback = originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1';
        return (originUrl.protocol === 'https:' && allowedOrigins.has(origin))
            || (process.env.NODE_ENV === 'development' && originUrl.protocol === 'http:'
                && isLoopback && originUrl.host === req.headers.get('host'));

    } catch {
        return false;
    }
}

export function validateHoneypot(body: Record<string, unknown>) {
    return Object.prototype.hasOwnProperty.call(body, HONEYPOT_FIELD_NAME)
        && body[HONEYPOT_FIELD_NAME] === '';
}

export function validateFormTiming(body: Record<string, unknown>) {
    const startedAt = Number(body[FORM_STARTED_FIELD_NAME]);
    const elapsed = Date.now() - startedAt;
    return Number.isFinite(startedAt) && elapsed >= 1200 && elapsed <= 7 * 24 * 60 * 60 * 1000;
}

export function validateEmail(value: unknown) {
    return typeof value === 'string'
        && value.length <= 254
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateRequiredStrings(body: Record<string, unknown>, fields: string[]) {
    return fields.every((field) => {
        const value = body[field];
        return typeof value === 'string' && value.trim().length > 0 && value.length <= 500;
    });
}

export function validateBasicInputs(inputs: Record<string, unknown>) {
    const strings = collectStrings(inputs);
    if (strings.some((value) => value.length > 10000)) return false;
    const combined = strings.join(' ').toLowerCase();
    if ((combined.match(/https?:\/\//g) || []).length > 3) return false;
    const spamKeywords = ['viagra', 'seo ranking', 'guest post', 'link building', 'investment opportunity'];
    return !spamKeywords.some((keyword) => combined.includes(keyword));
}

export function escapeHtml(value: unknown) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export function sanitizeSubmission<T>(value: T): T {
    if (typeof value === 'string') return escapeHtml(value) as T;
    if (Array.isArray(value)) return value.slice(0, 50).map(sanitizeSubmission) as T;
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, sanitizeSubmission(entry)])
        ) as T;
    }
    return value;
}

function collectStrings(value: unknown, depth = 0): string[] {
    if (depth > 4) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value.slice(0, 50).flatMap((entry) => collectStrings(entry, depth + 1));
    if (value && typeof value === 'object') {
        return Object.values(value as Record<string, unknown>).flatMap((entry) => collectStrings(entry, depth + 1));
    }
    return [];
}
