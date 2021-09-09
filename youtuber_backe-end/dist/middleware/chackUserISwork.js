"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chackUserIsWork = void 0;
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const user_model_1 = require("../models/user.model");
const chackUserIsWork = async function () {
    const users = await user_model_1.User.find({ weekFinished: true, activated: true }, { workingHours: true, daysOff: true });
    for (let i = 0; users.length > i; i++) {
        if (users[i].workingHours !== 0 && users[i].daysOff) {
            await user_model_1.User.updateOne({ _id: users[i]._id }, {
                $set: {
                    daysOff: users[i].daysOff - 1,
                },
            });
        }
        if (users[i].daysOff == 0) {
            await user_model_1.User.updateOne({ _id: users[i]._id }, {
                $set: {
                    blocked: true,
                },
            });
            await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                $set: {
                    blocked: true,
                },
            });
        }
    }
};
exports.chackUserIsWork = chackUserIsWork;
//# sourceMappingURL=chackUserISwork.js.map