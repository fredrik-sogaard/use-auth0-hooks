"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var auth0_context_1 = tslib_1.__importDefault(require("./auth0-context"));
var auth0_1 = require("../utils/auth0");
var user_context_1 = tslib_1.__importDefault(require("./user-context"));
/**
 * Logic which will take care of cleaning up the state and optionally calling the redirect handler.
 */
function redirectAfterLogin(appState, onRedirectCallback) {
    if (!window) {
        return;
    }
    // We want to remove the state and the code from the querystring.
    window.history.replaceState({}, document && document.title, window && window.location.pathname);
    // Allow the implementation of custom redirect logic.
    if (onRedirectCallback) {
        onRedirectCallback(appState);
    }
}
function initialState() {
    return {
        user: null,
        error: null,
        isAuthenticated: false,
        isLoading: false,
    };
}
function UserProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = react_1.useContext(auth0_context_1.default), client = _b.client, handlers = _b.handlers, popupOpen = _b.popupOpen;
    var _c = react_1.useState(initialState()), state = _c[0], setState = _c[1];
    react_1.useEffect(function () {
        var executeCallback = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var appState, user, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { isLoading: true }));
                        if (!client) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(window.location.search.includes("state=") ||
                            (window.location.search.includes("error=") ||
                                window.location.search.includes("code=")))) return [3 /*break*/, 3];
                        return [4 /*yield*/, auth0_1.ensureClient(client).handleRedirectCallback()];
                    case 2:
                        appState = (_a.sent()).appState;
                        redirectAfterLogin(appState, handlers.onRedirectCallback);
                        _a.label = 3;
                    case 3: return [4 /*yield*/, auth0_1.ensureClient(client).getUser()];
                    case 4:
                        user = _a.sent();
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { user: user, isAuthenticated: !!user }));
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        setState(tslib_1.__assign(tslib_1.__assign({}, initialState()), { error: err_1 }));
                        // Call a custom error handler if available.
                        if (handlers.onLoginError) {
                            handlers.onLoginError(err_1);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        executeCallback();
    }, [client, popupOpen]);
    return react_1.default.createElement(user_context_1.default.Provider, { value: state }, children);
}
exports.default = UserProvider;
//# sourceMappingURL=user-provider.js.map