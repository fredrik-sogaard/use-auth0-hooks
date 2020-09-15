"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function getComponentName(ChildComponent) {
    return ChildComponent.displayName || ChildComponent.name || 'Component';
}
function tryGetInitialPropsMethod(child) {
    var nextPage = child;
    return nextPage && nextPage.getInitialProps;
}
function withWrapper(ChildComponent, name, render) {
    var _this = this;
    var WrappedComponent = function (props) { return render(props); };
    // eslint-disable-next-line no-param-reassign
    WrappedComponent.displayName = name + "(" + getComponentName(ChildComponent) + ")";
    // Helper for Next.js support (getInitialProps)
    var getInitialProps = tryGetInitialPropsMethod(ChildComponent);
    if (getInitialProps) {
        var WrappedComponentNext = WrappedComponent;
        WrappedComponentNext.getInitialProps = function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, getInitialProps(args)];
        }); }); };
    }
    return WrappedComponent;
}
exports.default = withWrapper;
//# sourceMappingURL=with-wrapper.js.map