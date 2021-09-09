"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const auth_1 = require("../middleware/auth");
const search_1 = require("../helpers/search");
const router = express_1.Router();
router.post("/addMyEmails", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    const { email } = req.body;
    const { error } = activatedBouqute_model_1.VAEmails(req.body);
    if (error)
        return res.status(400).send("من فضللك ادخل اميل صحيح");
    let Rea = await activatedBouqute_model_1.ReantalBouquteActivated.find({
        userId: res.locals.user._id,
    });
    const resulltChackEmails = search_1.emailExists(email, Rea[0].emails);
    if (resulltChackEmails)
        return;
    res.status(400).send({
        error_en: "this email is alread exited",
        error_ar: " الاميل موجد بي الفعل ",
    });
    if (Rea[0].emails.length <= 10)
        return;
    res.status(400).send({
        error_en: "this email is alread exited",
        error_ar: "    لا يمكنك اضافة اكثر من 10 ايملات ",
    });
    if (!resulltChackEmails && Rea[0].emails.length <= 10) {
        await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: res.locals.user._id }, {
            $push: {
                emails: {
                    email: email,
                },
            },
        });
    }
    return res.status(200).send("done");
});
router.get("/myDetilsBouqute", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    let myBouqute = await activatedBouqute_model_1.ReantalBouquteActivated.find({
        userId: res.locals.user._id,
    }, { mission: true, wached: true, emails: true, userId: true });
    res.send({ myBouqute: myBouqute });
});
exports.default = router;
//# sourceMappingURL=activatedBouqute.router.js.map