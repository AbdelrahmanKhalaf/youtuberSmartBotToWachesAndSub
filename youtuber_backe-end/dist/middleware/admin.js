"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthuthrationMiddleware = void 0;
const jwt = require("jsonwebtoken");
const config = require("config");
const AuthuthrationMiddleware = async function (req, res, next) {
    try {
        if (!res.locals.user.isAdmin)
            return res.status(403).send("Accsess denied");
        next();
    }
    catch (ex) {
        next("Invalid admin");
        next();
    }
    return;
};
exports.AuthuthrationMiddleware = AuthuthrationMiddleware;
//# sourceMappingURL=admin.js.map