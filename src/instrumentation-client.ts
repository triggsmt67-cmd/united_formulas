import { initBotId } from 'botid/client/core';

const formRoutes = [
    '/api/send-inquiry',
    '/api/send-po',
    '/api/send-credit-app',
];

initBotId({
    protect: formRoutes.map((path) => ({
        path,
        method: 'POST' as const,
        advancedOptions: { checkLevel: 'basic' as const },
    })),
});
