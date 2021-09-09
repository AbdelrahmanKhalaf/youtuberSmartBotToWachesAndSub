"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("config");
const AuthenticationMiddleware = async function (req, res, next) {
    try {
        const token = req.header("Authentication");
        if (!token)
            return next("الوصول مرفوض ، لم يتم توفير رمز مميز");
        const decoded = jwt.verify(token, "privateTo");
        const user = await user_model_1.User.findById(decoded._id);
        if (!user)
            return next("Invalid Token");
        res.locals.user = user;
        return next();
    }
    catch (ex) {
        next("Invalid Token");
    }
};
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=auth.js.map