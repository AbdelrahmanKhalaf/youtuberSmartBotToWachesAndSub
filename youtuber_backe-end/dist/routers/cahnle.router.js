"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const googleapis_1 = require("googleapis");
const auth_1 = require("../middleware/auth");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const search_1 = require("../helpers/search");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const router = express_1.Router();
router.get("/", async (req, res, next) => {
    const outh2clinte = new OAuth2(config_1.default.oauth2Credentials.clinteId, config_1.default.oauth2Credentials.client_secret, config_1.default.oauth2Credentials.redirect_uris[0]);
    const loginLink = outh2clinte.generateAuthUrl({
        access_type: "offline",
        scope: config_1.default.oauth2Credentials.scopes,
    });
    res.status(200).send({ loginLink: loginLink });
});
var resposne;
var sub;
var tocken;
router.get("/authTocken", async (req, res, next) => {
    try {
        const outh2clinte = new OAuth2(config_1.default.oauth2Credentials.clinteId, config_1.default.oauth2Credentials.client_secret, config_1.default.oauth2Credentials.redirect_uris[0]);
        if (req.query.error) {
            console.log(req.query.error);
        }
        else {
            const code = req.query.code;
            outh2clinte.getToken(code, (err, token) => {
                if (err) {
                    res.status(400).send(req.query.err);
                }
                else {
                    if (!token) {
                        res.status(200).send("somthin wrong");
                    }
                    tocken = token;
                    outh2clinte.credentials = token;
                    const service = googleapis_1.google.youtube("v3");
                    const partChannels = "contentDetails,contentOwnerDetails,snippet";
                    const partsU = "contentDetails,snippet";
                    const partVideo = "statistics,snippet";
                    service.channels
                        .list({
                        auth: outh2clinte,
                        mine: true,
                        part: partChannels,
                    })
                        .then((response) => {
                        resposne = response.data.items[0];
                        service.subscriptions
                            .list({
                            auth: outh2clinte,
                            part: partsU,
                            maxResults: 100,
                            channelId: response.data.items[0].id,
                        })
                            .then((resulltOfSub) => {
                            sub = resulltOfSub;
                            res.redirect("http://youtuberbot.com/my-profile");
                        });
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.get("/dataChanle", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    setTimeout(async () => {
        if (resposne !== undefined) {
            let Rea = await activatedBouqute_model_1.ReantalBouquteActivated.find({
                userId: res.locals.user._id,
            });
            var resulltChackEmails = search_1.emailExists(resposne.id, Rea[0].emails);
            if (resulltChackEmails)
                return res.status(400).send({
                    error_en: "this email is alread exited",
                    error_ar: " الاميل موجد بي الفعل ",
                });
            if (Rea[0].emails.length >= 10)
                return res.status(400).send({
                    error_en: "maxLength is 10",
                    error_ar: " لا يمكن اضافة اكثر من عشرة اميلات    ",
                });
            console.log(tocken);
            await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ _id: Rea[0]._id }, {
                $push: {
                    emails: {
                        IdEmail: resposne.id,
                        name: resposne.snippet.title,
                        avatar: resposne.snippet.thumbnails.medium.url,
                        tokenChannale: tocken.refresh_token,
                        expiry_date: tocken.expiry_date,
                    },
                },
            });
            tocken = "";
            return res.redirect("/youtuber/api/chanle/AddSub");
        }
        return;
    }, 1000);
});
router.get("/AddSub", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    setTimeout(async () => {
        if (resposne !== undefined) {
            let Rea = await activatedBouqute_model_1.ReantalBouquteActivated.find({
                userId: res.locals.user._id,
            });
            var searchTerm = resposne.id, index = -1;
            for (var i = 0, len = Rea[0].emails.length; i < len; i++) {
                if (Rea[0].emails[i].IdEmail === searchTerm) {
                    index = i;
                    break;
                }
            }
            sub.data.items.forEach(async (sub) => {
                if (Rea[0].emails[index].Sub !== []) {
                    var resulltChackSub = search_1.SubExists(sub.snippet.resourceId.channelId, Rea[0].emails[index].Sub);
                }
                if (!resulltChackSub) {
                    const boda = await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({
                        _id: Rea[0]._id,
                        "emails.IdEmail": resposne.id,
                    }, {
                        $push: {
                            "emails.$.Sub": {
                                IdChannal: sub.snippet.resourceId.channelId,
                                name: sub.snippet.title,
                                avatar: sub.snippet.thumbnails.medium.url,
                            },
                        },
                    });
                }
            });
            resposne = "";
            return res.send({ ma: "تم اضفافتهم بنجاح " });
        }
        return;
    }, 2000);
});
router.get("/sub/:id", auth_1.AuthenticationMiddleware, async (req, res, next) => {
    const boda = await activatedBouqute_model_1.ReantalBouquteActivated.find({ userId: res.locals.user._id }, { emails: { $elemMatch: { _id: req.params.id } } }).sort({ dataOut: 1 });
    const outh2clinte = new OAuth2(config_1.default.oauth2Credentials.clinteId, config_1.default.oauth2Credentials.client_secret, config_1.default.oauth2Credentials.redirect_uris[0]);
    const token = { refresh_token: boda[0].emails[0].tokenChannale };
    outh2clinte.credentials = token;
    const service = googleapis_1.google.youtube("v3");
    const partChannels = "contentDetails,snippet";
    const partChannelsAdd = "contentDetails,snippet";
    const partsU = "contentDetails,snippet";
    return service.channels
        .list({
        auth: outh2clinte,
        mine: true,
        part: partChannels,
    })
        .then((response) => {
        service.subscriptions
            .list({
            auth: outh2clinte,
            part: partsU,
            maxResults: 100,
            channelId: boda[0].emails[0].IdEmail,
        })
            .then(async (resulltOfSub) => {
            for (let i = 0; i < 10; i++) {
                if (resulltOfSub.data.items[i].id !== undefined) {
                    var resulltChackSub = search_1.SubExists(resulltOfSub.data.items[i].snippet.resourceId.channelId, boda[0].emails[0].Sub);
                    if (!resulltChackSub) {
                        await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({
                            _id: boda[0]._id,
                            "emails._id": req.params.id,
                        }, {
                            $push: {
                                "emails.$.Sub": {
                                    IdChannal: resulltOfSub.data.items[i].snippet.resourceId
                                        .channelId,
                                    name: resulltOfSub.data.items[i].snippet.title,
                                    avatar: resulltOfSub.data.items[i].snippet.thumbnails.medium
                                        .url,
                                },
                            },
                        });
                        await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({
                            _id: boda[0]._id,
                            "emails._id": req.params.id,
                        }, {
                            $push: {
                                "emails.$.RequestSub": {
                                    IdChannal: resulltOfSub.data.items[i].snippet.resourceId
                                        .channelId,
                                    name: resulltOfSub.data.items[i].snippet.title,
                                    avatar: resulltOfSub.data.items[i].snippet.thumbnails.medium
                                        .url,
                                },
                            },
                        });
                    }
                }
            }
            const bouquts = await activatedBouqute_model_1.ReantalBouquteActivated.find();
            for (let i = 0; bouquts.length > i; i++) {
                var resulltChackSub = search_1.SubExists(bouquts[i].channalId, boda[0].emails[0].RequestSub);
                if (String(bouquts[i].channalId) !=
                    String(boda[0].emails[0].IdEmail) &&
                    !resulltChackSub) {
                    service.subscriptions.insert({
                        auth: outh2clinte,
                        part: partChannelsAdd,
                        resource: {
                            snippet: {
                                resourceId: {
                                    channelId: bouquts[i].channalId,
                                },
                            },
                        },
                    });
                }
            }
            res.send(boda);
        });
    });
});
exports.default = router;
//# sourceMappingURL=cahnle.router.js.map