import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
// Prevent a Vercel deployment from replacing working forms with unconfigured ones.
if (process.env.VERCEL === '1') {
    const missing = [];
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!redisUrl) missing.push('UPSTASH_REDIS_REST_URL or KV_REST_API_URL');
    if (!redisToken) missing.push('UPSTASH_REDIS_REST_TOKEN or KV_REST_API_TOKEN');
    if (missing.length) throw new Error(`Configure form security before deploying: ${missing.join(', ')}`);
    if (!redisUrl.startsWith('https://')) throw new Error('Redis REST URL must use HTTPS.');
}
