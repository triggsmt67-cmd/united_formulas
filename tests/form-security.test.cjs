/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest } = require('next/server');

// Execute the actual TS handlers with isolated env and mocked external services.
// Never load .env.local, call Resend, or make a network request.
function harness(options = {}) {
    const env = {
        NODE_ENV: 'production',
        UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'test-token',
        RESEND_API_KEY: 're_test', WAREHOUSE_EMAIL: 'warehouse@example.com',
        SALES_EMAIL: 'sales@example.com', CREDIT_EMAIL: 'credit@example.com', ...options.env,
    };
    const sent = [], calls = [], modules = new Map();
    const fetch = async (url, init) => {
        calls.push({ url, init });
        assert.equal(url, 'https://redis.test');
        if (options.redisDown) throw new Error('offline');
        return Response.json({ result: options.count ?? 1 });
    };
    const load = file => {
        file = path.resolve(file);
        if (modules.has(file)) return modules.get(file);
        const exports = {}; modules.set(file, exports);
        const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
        }).outputText;
        const localRequire = name => {
            if (name === 'botid/server') return { checkBotId: async () => {
                if (options.botIdDown) throw new Error('offline');
                return { isBot: options.isBot === true };
            } };
            if (name === 'resend') return { Resend: class {
                emails = { send: async payload => { sent.push(payload); return { data: { id: 'test-id' }, error: null }; } };
            } };
            if (name.startsWith('@/')) return load('src/' + name.slice(2) + '.ts');
            if (name.startsWith('.')) return load(path.join(path.dirname(file), name + '.ts'));
            return require(name);
        };
        vm.runInNewContext(code, { exports, require: localRequire, process: { env }, fetch,
            Buffer, URL, AbortSignal, console: { log() {}, warn() {}, error() {} },
        }, { filename: file });
        return exports;
    };
    return { load, sent, calls };
}
function payload(action = 'inquiry') {
    return {
        website_verify_field: '', form_started_at: Date.now() - 5000,
        fullName: 'Test Buyer', email: 'buyer@example.com', company: 'Test Company',
        formName: 'Contact Form', interest: 'Product Inquiries', message: 'Need cleaner',
        businessName: 'Test Company', items: [{ product: 'Cleaner', quantity: 1, price: '$10', total: '$10' }], grandTotal: '$10',
        ...(action === 'credit' ? { companyName: 'Test Company', address: 'Test Address', taxId: 'Test Tax ID', authSig: 'Buyer', authPrintedName: 'Buyer', directors: [], references: [] } : {}),
    };
}
function request(body, headers = {}) {
    return new NextRequest('https://unitedformulas.com/api/form', { method: 'POST',
        headers: { origin: 'https://unitedformulas.com', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.10', ...headers },
        body: typeof body === 'string' ? body : JSON.stringify(body),
    });
}
const routes = { inquiry: 'send-inquiry', po: 'send-po', credit: 'send-credit-app' };
for (const [action, route] of Object.entries(routes)) {
    test(`${action}: valid submission sends exactly one escaped email only to configured recipients`, async () => {
        const h = harness({ action });
        const body = { ...payload(action), fullName: '<img src=x onerror=alert(1)>', companyName: '<script>alert(1)</script>' };
        const res = await h.load(`src/app/api/${route}/route.ts`).POST(request(body));
        assert.equal(res.status, 200);
        assert.equal(h.sent.length, 1);
        assert.equal(h.sent[0].to.length, 1);
        assert.ok(!h.sent[0].to.includes(body.email));
        assert.ok(!h.sent[0].html.includes('<img src=x'));
        assert.ok(!h.sent[0].html.includes('<script>'));
    });
    for (const [name, change, options, status] of [
        ['filled honeypot', { website_verify_field: 'spam' }, {}, 400],
        ['missing honeypot', { website_verify_field: undefined }, {}, 400],
        ['BotID classification', {}, { isBot: true }, 403],
        ['rate limit', {}, { count: 6 }, 429],
        ['Redis outage', {}, { redisDown: true }, 503],
        ['BotID outage', {}, { botIdDown: true }, 503],
        ['missing Redis settings', {}, { env: { UPSTASH_REDIS_REST_TOKEN: '' } }, 503],
    ]) {
        test(`${action}: ${name} sends no email`, async () => {
            const h = harness({ action, ...options });
            const res = await h.load(`src/app/api/${route}/route.ts`).POST(request({ ...payload(action), ...change }));
            assert.equal(res.status, status);
            assert.equal(h.sent.length, 0);
            assert.ok((await res.json()).error);
            if (status === 429) assert.equal(res.headers.get('retry-after'), '600');
        });
    }
}
for (const origin of ['https://attacker.vercel.app', 'https://unitedformulas.com.attacker.example', 'null', 'http://localhost:3000', 'https://unitedformulas.com/path']) {
    test(`reject origin ${origin} before external calls`, async () => {
        const h = harness();
        const res = await h.load('src/app/api/send-inquiry/route.ts').POST(request(payload(), { origin }));
        assert.equal(res.status, 403); assert.equal(h.calls.length, 0);
    });
}
for (const [name, body, headers, status] of [
    ['malformed JSON', '{', {}, 400], ['null', 'null', {}, 400], ['array', '[]', {}, 400],
    ['text content type', payload(), { 'content-type': 'text/plain' }, 415],
    ['declared oversized payload', payload(), { 'content-length': '65537' }, 413],
    ['oversized payload without length header', JSON.stringify({ message: 'a'.repeat(65537) }), {}, 413],
    ['deep object', { ...payload(), nested: { a: { b: { c: { d: 1 } } } } }, {}, 400],
    ['null line item', { ...payload(), items: [null] }, {}, 400],
]) {
    test(`reject ${name}`, async () => {
        const h = harness();
        const res = await h.load('src/app/api/send-inquiry/route.ts').POST(request(body, headers));
        assert.equal(res.status, status); assert.equal(h.sent.length, 0);
    });
}
test('rate limit key is deterministic across instances and does not store a raw IP', async () => {
    const first = harness(), second = harness({ count: 6 });
    await first.load('src/app/api/send-inquiry/route.ts').POST(request(payload()));
    const res = await second.load('src/app/api/send-inquiry/route.ts').POST(request(payload()));
    assert.equal(res.status, 429);
    const a = JSON.parse(first.calls[0].init.body), b = JSON.parse(second.calls[0].init.body);
    assert.equal(a[3], b[3]); assert.ok(!a[3].includes('192.0.2.10'));
    assert.equal(a[0], 'EVAL'); assert.match(a[1], /EXPIRE/);
});
test('only the exact current preview is automatically allowed', () => {
    const h = harness({ env: { VERCEL_ENV: 'preview', VERCEL_URL: 'uf-preview.vercel.app' } });
    const { validateRequestOrigin } = h.load('src/lib/security.ts');
    assert.equal(validateRequestOrigin(request({}, { origin: 'https://uf-preview.vercel.app' })), true);
    assert.equal(validateRequestOrigin(request({}, { origin: 'https://other.vercel.app' })), false);
});

test('Vercel prebuild blocks missing shared-rate-limit settings', () => {
    const { spawnSync } = require('node:child_process');
    const { tmpdir } = require('node:os');
    const script = path.resolve('scripts/check-form-security-config.mjs');
    const run = extra => spawnSync(process.execPath, [script], { cwd: tmpdir(), encoding: 'utf8', env: {
        PATH: process.env.PATH, VERCEL: '1', VERCEL_ENV: 'production', ...extra,
    } });
    const missing = run({});
    assert.notEqual(missing.status, 0);
    assert.match(missing.stderr, /Configure form security before deploying/);
    const configured = {
        UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'configured-token',
    };
    assert.equal(run(configured).status, 0);
});

test('Vercel-generated KV credentials are accepted for shared rate limiting', async () => {
    const h = harness({ action: 'inquiry', env: {
        UPSTASH_REDIS_REST_URL: '', UPSTASH_REDIS_REST_TOKEN: '',
        KV_REST_API_URL: 'https://redis.test', KV_REST_API_TOKEN: 'vercel-token',
    } });
    const res = await h.load('src/app/api/send-inquiry/route.ts').POST(request(payload()));
    assert.equal(res.status, 200);
    assert.equal(h.sent.length, 1);
});
