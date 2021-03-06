"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const multer_1 = __importDefault(require("multer"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const auth_1 = require("../middleware/auth");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const reantelBouqute_model_1 = require("../models/reantelBouqute.model");
const admin_1 = require("../middleware/admin");
const apiKey = "ec6cd001556695eff89219bf6db28ae1-f7d0b107-b163b7c0";
const DOMAIN = "sandboxc1bd8898b47e42da8ba2d87e6b66805b.mailgun.org";
const mg = mailgun_js_1.default({ apiKey: apiKey, domain: DOMAIN });
const storage = multer_1.default.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + ".png");
    },
});
const fileFilter = function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer_1.default({
    storage: storage,
    fileFilter: fileFilter,
});
const type = upload.single("avatar");
const router = express_1.Router();
router.post("/singup", async (req, res, next) => {
    const { code, codeFrinde, email, password, phone, name, address, date, age, gender, playlist, workdays, endDaysWork, startDaysWork, daysOff, isAdmin, _id, yourChannel, avatar, weekFinished, blocked, finished, } = await req.body;
    const { error } = user_model_1.validateUser(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    let user = await user_model_1.User.findOne({ email: email });
    if (user)
        return res.status(400).send({
            error_en: "that user already  registered",
            error_ar: "?????? ???????????????? ???????? ????????????",
        });
    let nameUser = await user_model_1.User.findOne({ name: name });
    if (nameUser)
        return res.status(400).send({
            error_en: "that name already exist",
            error_ar: "?????? ?????????? ?????????? ????????????",
        });
    let chackPlaylist = await user_model_1.User.findOne({ playlist: playlist });
    if (chackPlaylist)
        return res.status(400).send({
            error_en: "that playlist already exist",
            error_ar: "?????????? ?????????????? ???????????? ????????????",
        });
    let chackChanle = await user_model_1.User.findOne({ yourChannel: yourChannel });
    if (chackChanle)
        return res.status(400).send({
            error_en: "that channale already exist",
            error_ar: " ???????????? ???????????? ????????????",
        });
    let codeV = await user_model_1.User.findOne({ code: code });
    if (codeV)
        return res.status(400).send({
            error_en: "that code already exist",
            error_ar: "?????????? ?????????? ????????????",
        });
    const users = new user_model_1.User({
        email: email,
        password: password,
        phone: phone,
        name: name,
        address: address,
        date: date,
        age: age,
        gender: gender,
        playlist: playlist,
        workdays: workdays,
        endDaysWork: endDaysWork,
        startDaysWork: startDaysWork,
        daysOff: daysOff,
        isAdmin: isAdmin,
        _id: _id,
        yourChannel: yourChannel,
        weekFinished: weekFinished,
        finished: finished,
        blocked: blocked,
        code: code,
        codeFrinde: codeFrinde,
    });
    const token = jsonwebtoken_1.default.sign({
        _id: _id,
        name: name,
        playlist: playlist,
        isAdmin: isAdmin,
        email: email,
    }, "privateTo");
    return users.save((err) => {
        if (err) {
            res.status(400).send({
                error_en: "please enter vaild data",
                error_ar: "???????????? ?????????? ???????????? ??????????",
                error: err,
            });
        }
        else {
            const data = {
                from: "you",
                to: email,
                subject: "Accont Actvition Link",
                html: `
                              <h2>please click on given link to activate you account</h2>
                              <a >http://youtuberbot.com/my-profile/activeEmail/${token}</a>

                      `,
            };
            mg.messages().send(data);
            res.status(200).send({
                message_ar: "???? ?????????? ???????????? ???????????????????? ?? ???????? ?????????? ?????????? ?? ?????????????? ???? ?????????? ?????????? ????????????????????",
                message_en: "Email has been sent , kindly activate your account , chack your email inbox",
            });
        }
    });
});
router.get("/me", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const user = await user_model_1.User.findById(res.locals.user._id).select("-password");
    return res.status(200).send(user);
});
router.get("/admin/:id", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const user = await user_model_1.User.find({ _id: req.params.id }).populate({
        path: "idBouqute",
        model: "bouquet",
    });
    const bouquetAct = await activatedBouqute_model_1.ReantalBouquteActivated.find({
        userId: user[0]._id,
    });
    const bouquet = await reantelBouqute_model_1.ReantalBouqutes.find({ idUser: user[0]._id });
    res.send({ user: user, bouquet: bouquetAct, bouquteData: bouquet });
});
router.put("/admin/changeInf/:id", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res, next) => {
    const { error } = user_model_1.validateUserUpdate(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const { phone, name, address, blocked } = req.body;
    let validName = await user_model_1.User.findOne({ name: name });
    if (validName)
        return res.status(400).send({
            error_en: "alredy name is exited",
            error_ar: "?????????? ???????? ???? ??????????",
        });
    const user = await user_model_1.User.updateOne({
        _id: req.params.id,
    }, {
        $set: {
            name: name,
            phone: phone,
            address: address,
            blocked: blocked,
        },
    });
    res.status(200).send(user);
    return;
});
router.put("/me/update", [auth_1.AuthenticationMiddleware], async (req, res, next) => {
    const { error } = user_model_1.validateUserUpdate(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const { phone, name, address, password } = req.body;
    let validPassword = await user_model_1.User.findOne({ password: password });
    if (!validPassword)
        return res.status(400).send({
            error_en: "invalid password",
            error_ar: "???????? ???????? ??????????",
        });
    let validName = await user_model_1.User.findOne({ name: name });
    if (validName)
        return res.status(400).send({
            error_en: "alredy name is exited",
            error_ar: "?????????? ???????? ???? ??????????",
        });
    const user = await user_model_1.User.updateOne({
        _id: res.locals.user._id,
    }, {
        $set: {
            name: name,
            phone: phone,
            address: address,
        },
    });
    if (!user)
        return res.status(400).send({
            error_en: "the user is not exited",
            error_ar: " ???????????????? ?????? ????????  ",
        });
    res.status(200).send(user);
    return;
});
router.put("/me/avatar", [auth_1.AuthenticationMiddleware, type], async (req, res, next) => {
    const avatar = await user_model_1.User.findById({ _id: res.locals.user._id });
    if (!avatar)
        return res
            .status(404)
            .send("The User Can't Found with the img Can You trying again");
    avatar.set({
        avatar: req.file.path,
    });
    res.status(200).send({ avatar: avatar });
    return avatar.save();
});
router.put("/me/changEmail/", [auth_1.AuthenticationMiddleware], async (req, res, next) => {
    const { error } = user_model_1.validateUserEmail(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const { password, email } = req.body;
    let validPassword = await user_model_1.User.findOne({ password: password });
    if (!validPassword)
        return res.status(400).send({
            error_en: "invalid password",
            error_ar: "???????? ???????? ??????????",
        });
    let validEmail = await user_model_1.User.findOne({ email: email });
    if (validEmail)
        return res.status(400).send({
            error_en: "alredy the email is existed",
            error_ar: "???????????? ???????? ????  ??????????",
        });
    const user = await user_model_1.User.updateOne({
        _id: res.locals.user._id,
    }, {
        $set: {
            email: email,
            verify: false,
            resetLink: "",
        },
    });
    return res.status(200).send({
        message_en: " Your email has been changed ",
        message_ar: "???? ?????????? ???????????? ?????????? ???? ",
    });
});
router.put("/me/changplayList/", [auth_1.AuthenticationMiddleware], async (req, res, next) => {
    const { error } = user_model_1.validateUserPlaylist(req.body);
    if (error)
        return res.status(404).send(error.details[0].message);
    const { password, playlist } = req.body;
    let validPassword = await user_model_1.User.findOne({ password: password });
    if (!validPassword)
        return res.status(400).send({
            error_en: "invalid password",
            error_ar: "???????? ???????? ??????????",
        });
    let validEmail = await user_model_1.User.findOne({ playlist: playlist });
    if (validEmail)
        return res.status(400).send({
            error_en: "alredy the playlist is existed",
            error_ar: "?????????? ?????????????? ?????????? ????  ??????????",
        });
    const user = await user_model_1.User.updateOne({
        _id: res.locals.user._id,
    }, {
        $set: {
            playlist: playlist,
        },
    });
    const IdPliylist = playlist.slice(playlist.indexOf("list="));
    const bouqouteUser = await activatedBouqute_model_1.ReantalBouquteActivated.find({
        userId: res.locals.user._id,
    });
    if (bouqouteUser[0] != undefined) {
        await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: res.locals.user._id }, {
            $set: {
                playlistId: IdPliylist,
            },
        });
        await reantelBouqute_model_1.ReantalBouqutes.updateOne({ idUser: res.locals.user._id }, {
            $set: {
                idChnnale: IdPliylist,
            },
        });
        return res.status(200).send({
            message_en: " Your playlist has been changed in your profile and your boqoute  ",
            message_ar: " ???? ?????????? ?????????? ?????????????? ???????????? ???? ???? ???????? ???????????? ?????? ??????????",
        });
    }
    else {
        return res.status(200).send({
            message_en: " Your playlist has been changed ",
            message_ar: "???? ?????????? ?????????? ???????????? ???????????? ???? ",
        });
    }
    return;
});
router.get("/users", [auth_1.AuthenticationMiddleware, admin_1.AuthuthrationMiddleware], async (req, res) => {
    const users = await user_model_1.User.find({ isAdmin: false }).populate({
        path: "idBouqute",
        model: "bouquet",
    });
    res.send(users);
});
router.put("/forget-password/", async (req, res) => {
    let token;
    const { email } = req.body;
    const validEmail = await user_model_1.User.find({ email: email });
    if (validEmail[0] === ([] && undefined)) {
        return res.status(400).send({
            error_en: "User with this email does not exists.",
            error_ar: "???????????????? ???????? ???????????? ???????????????????? ?????? ??????????.",
        });
    }
    if (validEmail[0] != ([] && undefined)) {
        token = jsonwebtoken_1.default.sign({ _id: validEmail[0]._id }, "abdoSamy", {
            expiresIn: "30m",
        });
        const data = {
            from: "lenamarwan575@gmail.com",
            to: email,
            subject: "Accont Forget Password Link",
            html: `
              <h2>please click on given link to reset your password</h2>
              <a>http://youtuberbot.com/my-profile/reset-password/${token}</a>
  
      `,
        };
        mg.messages().send(data, async (err, body) => {
            if (err) {
                console.log(err);
                res.send({ error: err.message });
            }
        });
    }
    return res.status(200).send({
        message_en: "Email has been sent , kindly  follow the instruction , chack your inbox  ",
        message_ar: "???? ?????????? ???????????? ???????????????????? ?? ???????? ?????????? ?????????????????? ?? ?????????????? ???? ?????????? ???????????? ?????????? ???? ",
    });
});
router.put("/reset-password/:resetLink", async (req, res) => {
    const { resetLink } = req.params;
    const { newPass } = req.body;
    if (!resetLink)
        return res.status(401).send({
            error_en: "incorrect token or it is expierd.",
            error_ar: "???????? ?????? ???????? ???? ?????????? ??????????????.",
        });
    const resetLinkV = await user_model_1.User.find({ resetLink: resetLink });
    if (!resetLinkV)
        res.status(400).send({
            error_en: "This Link Is Invalid",
            error_ar: "?????? ???????????? ?????? ????????",
        });
    if (resetLinkV[0].password === newPass)
        return res.status(400).send({
            error_en: "please change your password do not change your password like your old password.",
            error_ar: "???????????? ?????????? ???????? ???????????? ???????????? ???? ???? ???????? ???????? ???????????? ???????????? ???? ?????? ???????? ???????????? ??????????????.",
        });
    await user_model_1.User.updateOne({ resetLink: resetLink }, {
        $set: {
            password: newPass,
            resetLink: "",
        },
    });
    const data = {
        from: "lenamarwan575@gmail.com",
        to: resetLinkV[0].email,
        subject: "Accont change password",
        html: `
   <h2>Your password has been changed , You know it ?</h2> `,
    };
    mg.messages().send(data, async (err, body) => {
        if (err) {
            res.send({ error: err.message });
        }
    });
    return res.status(200).send({
        message_en: " Your password has been changed ",
        message_ar: " ???? ?????????? ???????? ???????? ???????????? ???? ",
    });
});
router.put("/change-password", auth_1.AuthenticationMiddleware, async (req, res) => {
    try {
        const { password, newPass } = req.body;
        const { error } = user_model_1.validateUserPassword(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const oldPass = await user_model_1.User.find({ password: password });
        if (!oldPass)
            return res.status(400).send({
                error_en: `The old password is wrong. Try again and verify that the old password is correct`,
                error_ar: `???????? ???????????? ?????????????? ??????????. ???????? ?????? ???????? ?????????? ???? ?????? ???????? ???????????? ??????????????`,
            });
        if (password === newPass)
            return res.status(400).send({
                error_en: "please change your password do not change your password like your old password.",
                error_ar: "???????????? ?????????? ???????? ???????????? ???????????? ???? ???? ???????? ???????? ???????????? ???????????? ???? ?????? ???????? ???????????? ??????????????.",
            });
        await user_model_1.User.updateOne({ _id: res.locals.user._id }, {
            $set: {
                password: newPass,
            },
        });
        return res.status(200).send({
            message_en: " Your password has been changed ",
            message_ar: "???? ?????????? ???????? ???????? ???????????? ???? ",
        });
    }
    catch (err) {
        throw err;
    }
});
router.post("/resendMessage", auth_1.AuthenticationMiddleware, async (req, res) => {
    try {
        const { email } = req.body;
        const { error } = user_model_1.validateUserEmail(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const user = await user_model_1.User.findOne({ email: email });
        if (!user)
            return res.status(400).send({
                erorr_en: `That email INVALID`,
                error_ar: `?????? ???????????? ???????????????????? ?????? ????????`,
            });
        const token = jsonwebtoken_1.default.sign({ email }, "privateTo", {
            expiresIn: "20m",
        });
        if (token) {
            const data = {
                from: "lenamarwan575@gmail.com",
                to: email,
                subject: "Accont Actvition Link",
                html: `
                      <h2>please click on given link to activate you account</h2>
                      <a>http://youtuberbot.com/my-profile/activeEmail/${token}</a>
      
              `,
            };
            mg.messages().send(data, (err, body) => {
                if (err) {
                    res.send({ error: err.message });
                }
                else {
                    res.send({
                        message_en: "The link was resubmitted, the link will be invalid 20 minutes from now",
                        message_ar: "???? ?????????? ?????????? ???????????? ?? ?????????? ???????????? ?????? ???????? ?????? 20 ?????????? ???? ????????",
                    });
                }
            });
        }
        else {
            res.status(400).send({
                error_en: "something is rwong!!!",
                error_ar: "???????? ???? ?????? ???????? !!!",
            });
        }
        return;
    }
    catch (err) {
        return res
            .status(400)
            .send({ message_en: "invlid TOKEN", message_ar: "?????? ?????? ????????" });
    }
});
router.put("/activate/:token", async (req, res) => {
    const { token } = req.params;
    if (token) {
        jsonwebtoken_1.default.verify(token, "privateTo", function (err, decoded) {
            if (err) {
                res.status(404).send({ error: err.message });
            }
            return user_model_1.User.findOne({ email: decoded.email }, (err, user) => {
                if (err || !user) {
                    return res.status(400).send({
                        error_en: "User with this email does not exists.",
                        error_ar: "???????????????? ???????? ???????????? ???????????????????? ?????? ??????????.",
                    });
                }
                const obj = {
                    verify: true,
                };
                user = lodash_1.default.extend(user, obj);
                return user.save((err, resullt) => {
                    if (err) {
                        return res.status(400).send({
                            error_en: "Link activate the email by mistake ",
                            error_ar: "???????? ?????????? ?????????????? ??????",
                        });
                    }
                    else {
                        return res.status(200).send({
                            message_en: " Your Email has been Activated ",
                            message_ar: " ???? ?????????? ?????????? ????????????????????",
                        });
                    }
                });
            });
        });
    }
    else {
        return res.send({ error: "something went wrong!!!" });
    }
    return;
});
router.post("/feedback", async (req, res) => {
    const { email, subject, des, name } = req.body;
    const data = {
        from: "lenamarwan575@gmail.com",
        to: email,
        subject: subject,
        html: `        
     <h1>subject:${subject}</h1>
     <h2>name:${name}</h2>
   <h3>Description:${des}</h3>`,
    };
    mg.messages().send(data, async (err, body) => {
        if (err) {
            res.send({ error: err.message });
        }
    });
    return res.send({
        message_en: "Your message has been sent thanks",
        message_ar: "???? ?????????? ???????????? ????????",
    });
});
exports.default = router;
//# sourceMappingURL=user.router.js.map