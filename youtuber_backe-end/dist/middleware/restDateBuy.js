"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reast = void 0;
const user_model_1 = require("../models/user.model");
const reantelBouqute_model_1 = require("../models/reantelBouqute.model");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const Reast = async function () {
    const reantalBouqutes = await reantelBouqute_model_1.ReantalBouqutes.find({ weakFinshed: false });
    reantalBouqutes.forEach(async (doc) => {
        const DateOFday = new Date(Date.now());
        if (doc)
            return console.log("لا يوجد مستخدمين في فترة تجربيه");
        if (doc.endWeak <= DateOFday) {
            const reantal = await reantelBouqute_model_1.ReantalBouqutes.findByIdAndUpdate({ _id: doc._id }, {
                weakFinshed: true,
            });
            await user_model_1.User.findByIdAndUpdate({ _id: doc.idUser }, {
                weekFinished: true,
            });
            await activatedBouqute_model_1.ReantalBouquteActivated.findByIdAndUpdate({ userId: doc.idUser }, {
                weekFinished: true,
            });
            if (!activatedBouqute_model_1.ReantalBouquteActivated)
                return console.log("not found the user");
        }
        if (doc.end <= DateOFday) {
            await activatedBouqute_model_1.ReantalBouquteActivated.findByIdAndUpdate({ userId: doc.idUser }, {
                $set: {
                    blocked: true,
                }
            });
            await user_model_1.User.findByIdAndUpdate({ _id: doc.idUser }, {
                $set: {
                    finished: true,
                    blocked: true
                }
            });
        }
    });
    return;
};
exports.Reast = Reast;
//# sourceMappingURL=restDateBuy.js.map