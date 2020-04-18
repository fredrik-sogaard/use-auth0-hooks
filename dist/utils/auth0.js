"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureClient(client) {
    if (!client) {
        throw new Error('Auth0Client was not initialized');
    }
    return client;
}
exports.ensureClient = ensureClient;
exports.DEFAULT_SCOPE = 'openid profile email';
const dedupe = (arr) => arr.filter((x, i) => arr.indexOf(x) === i);
function getUniqueScopes(...scopes) {
    const scopeString = scopes.filter(Boolean).join();
    return dedupe(scopeString.replace(/\s/g, ',').split(','))
        .join(' ')
        .trim();
}
exports.getUniqueScopes = getUniqueScopes;
function getTokenFromCache(client, audience, scope) {
    const cacheContainer = ensureClient(client);
    const { cache, options: { client_id } } = cacheContainer;
    const token = cache.get({
        client_id,
        scope: getUniqueScopes(exports.DEFAULT_SCOPE, scope),
        audience: audience || 'default'
    });
    // If token does not exist in cache, just return null
    if (!token) {
        return undefined;
    }
    return {
        accessToken: token.access_token,
        idToken: token.id_token,
        expiresIn: token.expires_in
    };
}
exports.getTokenFromCache = getTokenFromCache;
//# sourceMappingURL=auth0.js.map