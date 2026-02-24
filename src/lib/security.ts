
// Simple in-memory rate limiter (per-instance)
// Note: In serverless, this is not global but helps against concurrent bursts
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();

export function checkRateLimit(ip: string, limit: number = 5, windowMsValue: number = 60000) {
    const now = Date.now();
    const userData = rateLimitMap.get(ip);

    if (!userData || now > userData.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + windowMsValue });
        return true;
    }

    if (userData.count >= limit) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return false;
    }

    userData.count += 1;
    return true;
}

/**
 * Simple anti-spam utility
 */

export const HONEYPOT_FIELD_NAME = 'website_verify_field';

/**
 * Validates the honeypot field.
 * If the field is present and NOT empty, it's likely a bot.
 */
export function validateHoneypot(body: any) {
    const honeypot = body[HONEYPOT_FIELD_NAME];

    // If the honeypot field exists and contains any value, it's a bot
    if (honeypot !== undefined && honeypot !== '') {
        console.warn('Spam detected via honeypot field.');
        return false;
    }

    return true;
}

/**
 * Simple input validation to catch common bot patterns
 */
export function validateBasicInputs(inputs: Record<string, any>) {
    // Check for excessive URLs in message fields (common in spam)
    const message = inputs.message || '';
    const urlCount = (message.match(/https?:\/\//g) || []).length;

    if (urlCount > 3) {
        console.warn('Spam detected: excessive URLs in message.');
        return false;
    }

    // Check for common spam keywords if necessary
    const spamKeywords = ['crypto', 'viagra', 'seo ranking', 'bitcoin', 'investment opportunity'];
    const lowerMessage = message.toLowerCase();

    if (spamKeywords.some(keyword => lowerMessage.includes(keyword))) {
        console.warn('Spam detected: restricted keywords found.');
        return false;
    }

    return true;
}
