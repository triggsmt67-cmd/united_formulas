# Form security deployment

The contact, stock/price quote, purchase order, and credit application endpoints use Vercel BotID Basic as an invisible bot check. An atomic Upstash Redis counter also limits each IP to 5 inquiry attempts, 5 PO attempts, and 3 credit application attempts per 10 minutes. Contact and quote share the inquiry allowance. Counters include rejected attempts and are shared across function instances.

## Vercel configuration

The Vercel Upstash integration creates these sensitive environment variables for Production and Preview:

| Variable | Purpose |
| --- | --- |
| `KV_REST_API_URL` | HTTPS Redis REST endpoint |
| `KV_REST_API_TOKEN` | Redis REST read/write token |

The code also accepts Upstash's `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` names when the database is configured outside Vercel. Do not duplicate or manually copy credentials when the integration has created the `KV_*` values. The npm prebuild check blocks Vercel builds without a Redis REST URL and read/write token.

BotID Basic is free on all Vercel plans and does not require keys or another account. `src/instrumentation-client.ts` attaches the invisible browser challenge to the three POST endpoints, and each endpoint calls `checkBotId()` before parsing or processing the submission. Deep Analysis is intentionally not enabled because it is a paid feature on Pro and Enterprise plans.

## Preview and local use

Only the two production origins are allowed by default. The exact `VERCEL_URL` is automatically allowed for preview deployments. For a stable staging alias, set `FORM_ALLOWED_ORIGINS` to comma-separated exact HTTPS origins with no trailing slashes. Never use wildcard origins.

`npm run dev` permits same-host localhost and 127.0.0.1 HTTP origins. Vercel BotID reports a non-bot result locally by default, while Redis rate limiting still requires configured credentials. Automated tests mock BotID, Redis, and Resend, never load local credentials, and send no email.

Client IP detection assumes Vercel's trusted proxy overwrites `x-forwarded-for`. If hosting elsewhere, ensure the proxy overwrites that header and prevents direct access to the application. A proxy in front of Vercel may cause users to share a rate-limit bucket; confirm behavior before changing DNS or proxy settings.

## Changed behavior

- Hidden honeypots, timing checks, keyword checks, and HTML escaping remain in place.
- BotID Basic blocks automated clients without displaying a CAPTCHA to legitimate users.
- Invalid or filtered submissions return errors rather than fake success. PO and quote drafts are cleared only on accepted submissions.
- The server rejects bodies over 64 KiB, malformed JSON, excessive nesting, and invalid list entries.
- PO emails go only to configured warehouse recipients. The submitter's unverified email address remains in the order details but no longer receives an automatic copy. Staff can follow up with the official invoice as before.
- Provider errors and response metadata are not returned to the browser.
- GTM `GTM-KZPZ7VZT`, submit button `submit-po-btn`, and the PO provider are preserved.

## Verification and rollout

Run `npm run test:security`, ESLint, and `npm run build`. Tests exercise all three email handlers with mocked dependencies, including valid submissions, BotID rejection and failure, honeypots, forged origins, shared rate-limit keys, oversized JSON, invalid nested data, and Redis failures. Provider mocks do not prove production infrastructure is configured correctly.

After deployment, perform one controlled submission on each form. Check that failed retries preserve input, the warehouse receives accepted submissions, and PO conversion tracking fires only on success. BotID decisions can be inspected in the Vercel project's Firewall traffic view.

This change does not deploy the site, assess historical compromise, change the chatbot endpoint, or resolve the existing indirect `uuid`/`gaxios` dependency audit findings.

References: [Vercel BotID](https://vercel.com/docs/botid), [BotID setup](https://vercel.com/docs/botid/get-started), [Upstash REST API](https://upstash.com/docs/redis/features/restapi), [Vercel request headers](https://vercel.com/docs/headers/request-headers).
