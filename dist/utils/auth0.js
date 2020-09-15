"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureClient(client) {
    if (!client) {
        throw new Error("Auth0Client was not initialized");
    }
    return client;
}
exports.ensureClient = ensureClient;
exports.DEFAULT_SCOPE = "openid profile email";
var dedupe = function (arr) {
    return arr.filter(function (x, i) { return arr.indexOf(x) === i; });
};
function getUniqueScopes() {
    var scopes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        scopes[_i] = arguments[_i];
    }
    var scopeString = scopes.filter(Boolean).join();
    return dedupe(scopeString.replace(/\s/g, ",").split(","))
        .join(" ")
        .trim();
}
exports.getUniqueScopes = getUniqueScopes;
function getTokenFromCache(client, 
//@ts-ignore
audience, scope) {
    var cacheContainer = ensureClient(client);
    var cache = cacheContainer.cache, client_id = cacheContainer.options.client_id;
    var token = cache.get({
        client_id: client_id,
        scope: getUniqueScopes(exports.DEFAULT_SCOPE, scope),
        audience: audience || "default",
    });
    // If token does not exist in cache, just return null
    if (!token) {
        return undefined;
    }
    return {
        accessToken: token.access_token,
        idToken: token.id_token,
        expiresIn: token.expires_in,
    };
}
exports.getTokenFromCache = getTokenFromCache;
//# sourceMappingURL=auth0.js.map