"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chackUserIsFinishedOrNot = void 0;
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const user_model_1 = require("../models/user.model");
const bouquets_model_1 = require("../models/bouquets.model");
const chackUserIsFinishedOrNot = async function () {
    const user = await activatedBouqute_model_1.ReantalBouquteActivated.find();
    for (let i = 0; user.length > i; i++) {
        if (user[i].workingHours <= 0) {
            for (let m of user[i].mission) {
                const bouqute = await bouquets_model_1.Bouquet.find({ _id: user[i].bouquteId });
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ _id: user[i]._id }, {
                    $push: {
                        wached: {
                            userId: m.userId,
                            playlistId: m.playlistId,
                        },
                    },
                    $pull: {
                        mission: {
                            userId: m.userId,
                        },
                    },
                    $set: {
                        workingHours: bouqute[0].dailyWorkingHours,
                    },
                });
                await user_model_1.User.updateOne({ _id: user[i].userId }, {
                    $set: {
                        workingHours: bouqute[0].dailyWorkingHours,
                    },
                });
            }
        }
    }
};
exports.chackUserIsFinishedOrNot = chackUserIsFinishedOrNot;
//# sourceMappingURL=chackUserFinshedWork.js.map