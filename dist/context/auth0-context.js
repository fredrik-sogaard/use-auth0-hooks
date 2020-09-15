"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = react_1.createContext({
    client: undefined,
    login: function () {
        throw new Error("Auth0Client was not initialized");
    },
    loginPopup: function () {
        throw new Error("Auth0Client was not initialized");
    },
    logout: function () {
        throw new Error("Auth0Client was not initialized");
    },
    popupOpen: false,
    handlers: {},
});
//# sourceMappingURL=auth0-context.js.map