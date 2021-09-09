"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const joi_1 = __importDefault(require("joi"));
const router = express_1.Router();
router.post("/", async (req, res) => {
    try {
        const { email, password } = await req.body;
        const { error } = validateUser(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        let user = await user_model_1.User.findOne({ email: email });
        if (!user)
            res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            });
        let validPassword = await user_model_1.User.findOne({ password: password });
        if (!validPassword)
            res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            });
        const token = user.generaToken();
        return res.header("Authentication", token).status(200).send({
            user: user,
            bearer: token,
        });
    }
    catch (ex) {
        throw new Error(ex);
    }
});
router.post("/admin", async (req, res) => {
    try {
        const { email, password } = await req.body;
        const { error } = validateUser(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        let user = await user_model_1.User.findOne({ email: email });
        if (!user)
            res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            });
        let validPassword = await user_model_1.User.findOne({ password: password });
        if (!validPassword)
            return res.status(400).send({
                error_en: "invalid email / or password",
                error_ar: "البريد الإلكتروني أو كلمة السر خاطئة",
            });
        if (!user.isAdmin)
            return res.status(400).send({
                error_en: "you are not admin",
                error_ar: "  لست صاحب الموقع    ",
            });
        await user.save();
        const token = user.generaToken();
        return res.header("Authentication", token).status(200).send({
            user: user,
            bearer: token,
        });
    }
    catch (ex) {
        throw new Error(ex);
    }
});
async function validateUser(auth) {
    const schema = await {
        email: joi_1.default.string().email().min(8).max(315).email().required(),
        password: joi_1.default.string().min(8).max(315).required(),
    };
    return joi_1.default.validate(auth, schema);
}
exports.default = router;
//# sourceMappingURL=auth.router.js.map