"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var user_context_1 = tslib_1.__importDefault(require("../context/user-context"));
var auth0_1 = require("../utils/auth0");
var auth0_context_1 = tslib_1.__importDefault(require("../context/auth0-context"));
function initialState() {
    return {
        token: null,
        error: null,
        isLoading: false,
    };
}
function useAuth(tokenRequest) {
    var _this = this;
    var _a = react_1.useContext(user_context_1.default), isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading, error = _a.error, user = _a.user;
    var _b = react_1.useContext(auth0_context_1.default), client = _b.client, login = _b.login, logout = _b.logout, handlers = _b.handlers, loginPopup = _b.loginPopup;
    var cachedToken;
    // If no token is needed we can just stop here.
    if (!tokenRequest) {
        return {
            user: user,
            error: error,
            isAuthenticated: isAuthenticated,
            isLoading: isLoading,
            login: login,
            logout: logout,
            loginPopup: loginPopup,
        };
    }
    if (client) {
        // Try to fetch the token initially from the cache in a synchronous way.
        cachedToken = auth0_1.getTokenFromCache(client, tokenRequest.audience, tokenRequest.scope);
    }
    // The following will holde the additional state for this hook.
    // We'll try to fetch the token from the cache first if available.
    var _c = react_1.useState(function () { return (tslib_1.__assign(tslib_1.__assign({}, initialState()), { token: cachedToken })); }), state = _c[0], setState = _c[1];
    react_1.useEffect(function () {
        // We are not ready to fetch a token yet.
        if (!client || isLoading || !isAuthenticated) {
            return;
        }
        // Token is already available in this instance, no need to re-fetch it.
        if (state.token) {
            return;
        }
        // Try to fetch the token from the cache in a synchronous way.
        cachedToken = auth0_1.getTokenFromCache(client, tokenRequest.audience, tokenRequest.scope);
        if (cachedToken) {
            setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { token: cachedToken }));
            return;
        }
        // We were not able to get the token from cache, so now we'll just start a transaction
        var getToken = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { isLoading: true }));
                        // We will fetch the token in a silent way. getTokenSilently will cache the id_token and access_token
                        // However this function only returns the access token string, therefore we fetch from cache next
                        return [4 /*yield*/, auth0_1.ensureClient(client).getTokenSilently({
                                // audience: tokenRequest.audience,
                                scope: tokenRequest.scope,
                            })];
                    case 1:
                        // We will fetch the token in a silent way. getTokenSilently will cache the id_token and access_token
                        // However this function only returns the access token string, therefore we fetch from cache next
                        _a.sent(), // We will fetch the token in cache
                            (cachedToken = auth0_1.getTokenFromCache(client, tokenRequest.audience, tokenRequest.scope));
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { token: cachedToken }));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        // An error occured.
                        if (handlers.onAccessTokenError) {
                            handlers.onAccessTokenError(e_1, tokenRequest);
                        }
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { error: e_1 }));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        getToken();
    }, [isAuthenticated, isLoading]);
    return {
        user: user,
        error: error || state.error,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading || state.isLoading,
        token: state.token,
        accessToken: state.token && state.token.accessToken,
        login: login,
        loginPopup: loginPopup,
        logout: logout,
    };
}
exports.default = useAuth;
//# sourceMappingURL=use-auth.js.map