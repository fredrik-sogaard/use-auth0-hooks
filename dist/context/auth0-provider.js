"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var auth0_spa_js_1 = tslib_1.__importDefault(require("@auth0/auth0-spa-js"));
var react_1 = tslib_1.__importStar(require("react"));
var auth0_context_1 = tslib_1.__importDefault(require("./auth0-context"));
var user_provider_1 = tslib_1.__importDefault(require("./user-provider"));
var auth0_1 = require("../utils/auth0");
function Auth0Provider(_a) {
    var _this = this;
    var children = _a.children, clientId = _a.clientId, redirectUri = _a.redirectUri, onRedirecting = _a.onRedirecting, onRedirectCallback = _a.onRedirectCallback, onLoginError = _a.onLoginError, onAccessTokenError = _a.onAccessTokenError, props = tslib_1.__rest(_a, ["children", "clientId", "redirectUri", "onRedirecting", "onRedirectCallback", "onLoginError", "onAccessTokenError"]);
    var _b = react_1.useState(), client = _b[0], setClient = _b[1];
    var _c = react_1.useState(false), popupOpen = _c[0], setPopupOpen = _c[1];
    react_1.useEffect(function () {
        var initAuth0 = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = setClient;
                        return [4 /*yield*/, auth0_spa_js_1.default(tslib_1.__assign({ client_id: clientId, redirect_uri: redirectUri }, props))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        if (onLoginError) {
                            onLoginError(err_1);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        initAuth0();
    }, []);
    var loginPopup = function (options, config) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setPopupOpen(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth0_1.ensureClient(client).loginWithPopup(options, config)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    if (onLoginError) {
                        onLoginError(error_1);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    setPopupOpen(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var value = {
        client: client,
        login: function (opt) {
            return auth0_1.ensureClient(client).loginWithRedirect(opt);
        },
        loginPopup: loginPopup,
        popupOpen: popupOpen,
        logout: function (opt) { return auth0_1.ensureClient(client).logout(opt); },
        getAccessToken: function (opt) {
            return auth0_1.ensureClient(client).getTokenSilently(opt);
        },
        handlers: {
            onRedirecting: onRedirecting,
            onRedirectCallback: onRedirectCallback,
            onLoginError: onLoginError,
            onAccessTokenError: onAccessTokenError,
        },
    };
    return (react_1.default.createElement(auth0_context_1.default.Provider, { value: value },
        react_1.default.createElement(user_provider_1.default, null, children)));
}
exports.default = Auth0Provider;
//# sourceMappingURL=auth0-provider.js.map