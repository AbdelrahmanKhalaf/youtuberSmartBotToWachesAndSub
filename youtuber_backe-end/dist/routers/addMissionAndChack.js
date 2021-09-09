"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const addMissinonToUser_1 = require("../middleware/addMissinonToUser");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const auth_1 = require("../middleware/auth");
const bouquets_model_1 = require("../models/bouquets.model");
const app = express_1.default();
const router = express_1.Router();
router.post("/start", async (req, res, next) => {
    const start = req.body.start;
    if (start) {
        addMissinonToUser_1.AddMisionToUSerAndPaidAndTry();
        res.status(200).send("لقد تم اضافة المهام للمستخدمين بنجاح");
    }
    else {
        res.status(400).send(" الربوت في حالة استرخاء الان");
    }
});
router.post("/addChnnaleTry", auth_1.AuthenticationMiddleware, async (req, res) => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "مجانيه" });
    const { playlistId } = req.body;
    bouquteId.forEach(async (bouqute) => {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouqute._id,
        });
        const playListId = playlistId.slice(playlistId.indexOf("list="));
        reantalBouquteActivated.forEach(async (doc) => {
            if (!doc.Activated && !doc.weekFinished) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: doc.userId }, {
                    $push: {
                        mission: [
                            { userId: res.locals.user._id, playlistId: playListId },
                        ],
                    },
                }, { silce: 1 });
            }
        });
    });
    res.status(200).send("done");
});
router.post("/addChnnaleFree", auth_1.AuthenticationMiddleware, async (req, res) => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "مجانيه" });
    const { userId, playlistId } = req.body;
    bouquteId.forEach(async (bouqute) => {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouqute._id,
        });
        const playListId = playlistId.slice(playlistId.indexOf("list="));
        reantalBouquteActivated.forEach(async (doc) => {
            if (doc.Activated && doc.weekFinished) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: doc.userId }, {
                    $push: {
                        mission: [
                            { userId: res.locals.user._id, playlistId: playListId },
                        ],
                    },
                }, { silce: 1 });
            }
        });
    });
    res.send("done");
});
exports.default = router;
//# sourceMappingURL=addMissionAndChack.js.map