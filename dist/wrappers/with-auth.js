"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var use_auth_1 = tslib_1.__importDefault(require("../hooks/use-auth"));
var with_wrapper_1 = tslib_1.__importDefault(require("../utils/with-wrapper"));
function withAuth(ChildComponent, options) {
    return with_wrapper_1.default(ChildComponent, 'withAuth', function (_a) {
        var props = tslib_1.__rest(_a, []);
        var auth = use_auth_1.default(options);
        return (react_1.default.createElement(ChildComponent, tslib_1.__assign({}, props, { auth: auth })));
    });
}
exports.default = withAuth;
//# sourceMappingURL=with-auth.js.map