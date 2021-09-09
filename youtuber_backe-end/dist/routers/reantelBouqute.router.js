"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bouquets_model_1 = require("../models/bouquets.model");
const reantelBouqute_model_1 = require("../models/reantelBouqute.model");
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const add_days_1 = require("../helpers/add.days");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const admin_1 = require("../middleware/admin");
const router = express_1.Router();
router.post("/", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    const { error } = reantelBouqute_model_1.validateReantalBouqute(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const { dataOut, dateAccsept, idBouqute, buy, startWeak, endWeak, end, start, weakFinshed, } = req.body;
    let user = await user_model_1.User.findOne({ _id: res.locals.user._id });
    if (!user)
        return res.status(400).send({
            error_en: "that user is not registered",
            error_ar: "هذا المستخدم غير مسجل",
        });
    let bouquet = await bouquets_model_1.Bouquet.findOne({ _id: idBouqute });
    if (!bouquet)
        return res.status(400).send({
            error_en: "This bouquet does not exist",
            error_ar: "هذه الباقة غير موجودة",
        });
    let reantalBouqte = await reantelBouqute_model_1.ReantalBouqutes.findOne({
        idUser: user._id,
    });
    if (reantalBouqte) {
        if (reantalBouqte.idBouqute != idBouqute) {
            return res.status(400).send({
                error_en: "You have already bought the package",
                error_ar: " لقد اشتريت باقه اخري بالفعل , ولا يمكنك شراء باقه اخري   ",
            });
        }
        if (!reantalBouqte.buy && reantalBouqte.weakFinshed === true)
            return res.status(400).send({
                error_en: "You have already bought the package",
                error_ar: " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  , انتظر حتي يتم الموفقه علي بقاقتك ",
            });
        if (reantalBouqte.buy && reantalBouqte.weakFinshed === true)
            return res.status(400).send({
                error_en: "You have already bought the package",
                error_ar: " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  ,   وتم الموفقه علي باقتك ",
            });
        if (!reantalBouqte.buy && !reantalBouqte.weakFinshed)
            return res.status(400).send({
                error_en: "You have already submitted an order to purchase the pouqute",
                error_ar: " انت الان في فترة التجربه وبي الفعل  قدمت عليها وعند انتهاء الفتره المجانيه سوف تدخل المرجعه",
            });
        if (reantalBouqte.idUser)
            return res.status(400).send({
                error_en: "You have already submitted an order to purchase the pouqute",
                error_ar: "لقد قدمت علي الباقه",
            });
    }
    const IdPliylist = user.playlist.slice(user.playlist.indexOf("list="));
    const IdChannal = user.yourChannel.slice(user.yourChannel.indexOf("channel/") + 8);
    let newReantalBouqute = new reantelBouqute_model_1.ReantalBouqutes({
        idUser: res.locals.user._id,
        idChnnale: IdPliylist,
        idBouqute: bouquet._id,
        buy: buy,
        dateAccsept: dateAccsept,
        dataOut: dataOut,
        startWeak: startWeak,
        endWeak: endWeak,
        weakFinshed: weakFinshed,
        start: start,
        end: end,
    });
    let reantalActivate = await activatedBouqute_model_1.ReantalBouquteActivated.findOne({
        _id: user._id,
    });
    if (reantalActivate) {
        if (reantalActivate.weekFinished && !reantalActivate.Activated)
            return res.status(400).send({
                error_en: "You have already bought the package",
                error_ar: " لقد اشتريت الباقة بالفعل , وانتهت فترة التجربه  , انتظر حتي يتم الموفقه علي بقاقتك ",
            });
        if (!reantalActivate.weekFinished && !reantalActivate.Activated)
            return res.status(400).send({
                error_en: "You have already submitted an order to purchase the pouqute",
                error_ar: " انت الان في فترة التجربه وبي الفعل  قدمت عليها وعند انتهاء الفتره المجانيه سوف تدخل المرجعه",
            });
        if (reantalActivate.userId)
            return res.status(400).send({
                error_en: "You have already submitted an order to purchase the pouqute",
                error_ar: "لقد قدمت علي الباقه",
            });
    }
    const dailyWorking = await bouquets_model_1.Bouquet.find({ _id: bouquet._id }, { numberOfDays: true, daysOff: true, dailyWorkingHours: true, _id: true });
    let newReantalActivate = new activatedBouqute_model_1.ReantalBouquteActivated({
        userId: res.locals.user._id,
        bouquteId: bouquet,
        playlistId: IdPliylist,
        weekFinished: weakFinshed,
        workingHours: 0,
        channalId: IdChannal,
    });
    await user_model_1.User.findByIdAndUpdate({ _id: user._id }, {
        idBouqute: bouquet,
        weakFinshed: false,
        workingHours: 0,
    });
    await newReantalActivate.save();
    await newReantalBouqute.save();
    return res.send({
        order: newReantalBouqute,
        newReantalActivated: newReantalActivate,
        message_ar: "لقد حصلت علي الاسبوع المجاني من الان ويمكنك تفعيل الباقه بعد انتهاء الاسبوع ",
    });
});
router.get("/allAccsept", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({ buy: true }).populate({
        path: "idUser",
        model: "user",
        select: "name phone email idBouqute",
        populate: {
            path: "idBouqute",
            model: "bouquet",
            select: "title",
        },
    });
    res.send(allUserAccsept);
});
router.get("/allTryIt", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({
        weakFinshed: false,
    }).populate({
        path: "idUser",
        model: "user",
        select: "name phone  email idBouqute code codeFrinde",
        populate: {
            path: "idBouqute",
            model: "bouquet",
            select: "title",
        },
    });
    res.send(allUserAccsept);
});
router.get("/allNotAccsept", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({
        weakFinshed: true,
        buy: false,
    }).populate({
        path: "idUser",
        model: "user",
        select: "name phone email idBouqute",
        populate: {
            path: "idBouqute",
            model: "bouquet",
            select: "title",
        },
    });
    res.send(allUserAccsept);
});
router.get("/free", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const Boqute = await bouquets_model_1.Bouquet.find({ title: "مجانيه" });
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({ idBouqute: Boqute[0]._id }, {
        weakFinshed: false,
    }).populate({
        path: "idUser",
        model: "user",
        select: "name phone  email idBouqute  ",
        populate: {
            path: "idBouqute",
            model: "bouquet",
            select: "title",
        },
    });
    res.send(allUserAccsept);
});
router.get("/piad", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const Boqute = await bouquets_model_1.Bouquet.find({ title: "ثلاث شهور" });
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({ idBouqute: Boqute[0]._id }, {
        weakFinshed: false,
    }).populate({
        path: "idUser",
        model: "user",
        select: "name phone  email idBouqute code codeFrinde",
        populate: {
            path: "idBouqute",
            model: "bouquet",
            select: "title",
        },
    });
    res.send(allUserAccsept);
});
router.get("/DetilsBouqute/:id", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    let allUserAccsept = await reantelBouqute_model_1.ReantalBouqutes.find({
        _id: req.params.id,
    }).populate({
        path: "idUser",
        model: "user",
        populate: {
            path: "idBouqute",
            model: "bouquet",
        },
    });
    res.send({ allUserAccsept: allUserAccsept });
});
router.get("/myBouqute", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    let myBouqute = await reantelBouqute_model_1.ReantalBouqutes.find({ idUser: res.locals.user._id });
    res.send({ myBouqute: myBouqute });
});
router.put("/update/:id", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const { error } = reantelBouqute_model_1.validateAccseptUser(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const dateAc = Date.now();
    const ID = req.params.id;
    const NewDate = new Date(dateAc);
    const IdBouqute = await reantelBouqute_model_1.ReantalBouqutes.find({ idUser: ID }, {
        idBouqute: true,
        idUser: true,
        buy: true,
        endWeak: true,
        weakFinshed: true,
    });
    const IdBouquteAc = await activatedBouqute_model_1.ReantalBouquteActivated.find({ userId: ID });
    const emails = await activatedBouqute_model_1.ReantalBouquteActivated.find({
        userId: ID,
    });
    const dailyWorking = await bouquets_model_1.Bouquet.find({ _id: IdBouqute[0].idBouqute }, { numberOfDays: true, daysOff: true, dailyWorkingHours: true });
    const date = add_days_1.addDays(NewDate, dailyWorking[0].numberOfDays - 7);
    if (IdBouqute[0].weakFinshed === false && IdBouqute[0].buy === false)
        return res.status(400).send({
            Error: " المستخدم ما ذال في  التجربه الاسبوعيه لا يمكن تحديث باقتو",
        });
    if (new Date(NewDate) < IdBouqute[0].endWeak)
        return res.status(404).send("  لم ينتهي الوقت");
    if (emails[0].emails.length !== 10)
        return res.status(400).send({
            Error: "  المستخدم لم يكمل الاميلات ",
        });
    const rantaleBouquteUpdate = await reantelBouqute_model_1.ReantalBouqutes.updateOne({ idUser: ID }, {
        buy: req.body.buy,
        dateAccsept: dateAc,
        start: dateAc,
        end: date,
    });
    if (!rantaleBouquteUpdate)
        return res.status(404).send("هذا الاوردر غير موجد");
    const user = await user_model_1.User.findByIdAndUpdate(IdBouqute[0].idUser, {
        daysOff: dailyWorking[0].daysOff,
        startDaysWork: dateAc,
        endDaysWork: date,
        workingHours: 0,
        workdays: dailyWorking[0].numberOfDays,
        idBouqute: IdBouquteAc[0]._id,
        activated: true,
    });
    await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: ID }, {
        Activated: true,
    });
    return res.send({ user: user });
});
router.put("/unblocked/:id", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res) => {
    const resullt = req.body.unblocked;
    const user = await user_model_1.User.updateOne({ _id: req.params.id }, {
        $set: {
            blocked: resullt,
        },
    });
    if (!user)
        return res.status(400).send("مستخدم غير موجد");
    const bouqute = await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: req.params.id }, {
        $set: {
            blocked: resullt,
        },
    });
    if (!bouqute)
        return res.status(400).send("باقه غير موجده");
    return;
});
exports.default = router;
//# sourceMappingURL=reantelBouqute.router.js.map