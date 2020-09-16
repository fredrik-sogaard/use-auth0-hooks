"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qss_1 = require("qss");
var react_1 = tslib_1.__importStar(require("react"));
var use_auth_1 = tslib_1.__importDefault(require("../hooks/use-auth"));
var auth0_context_1 = tslib_1.__importDefault(require("../context/auth0-context"));
var with_wrapper_1 = tslib_1.__importDefault(require("../utils/with-wrapper"));
function getReturnTo() {
    if (window && window.location) {
        return {
            returnTo: {
                pathname: window.location.pathname,
                query: qss_1.decode(window.location.search),
            },
        };
    }
    return {};
}
function withLoginRequired(ChildComponent) {
    return with_wrapper_1.default(ChildComponent, "withLoginRequired", function (_a) {
        var path = _a.path, rest = tslib_1.__rest(_a, ["path"]);
        var _b = use_auth_1.default(), isLoading = _b.isLoading, isAuthenticated = _b.isAuthenticated, login = _b.login;
        var context = react_1.useContext(auth0_context_1.default);
        react_1.useEffect(function () {
            if (!context.client || isLoading || isAuthenticated) {
                return;
            }
            login({ appState: getReturnTo() });
        }, [context.client, isLoading, isAuthenticated, login, path]);
        if (isAuthenticated) {
            // cast to T needed https://github.com/Microsoft/TypeScript/issues/28938
            return react_1.default.createElement(ChildComponent, tslib_1.__assign({}, rest));
        }
        return ((context.handlers.onRedirecting && context.handlers.onRedirecting()) ||
            null);
    });
}
exports.default = withLoginRequired;
//# sourceMappingURL=with-login-required.js.map