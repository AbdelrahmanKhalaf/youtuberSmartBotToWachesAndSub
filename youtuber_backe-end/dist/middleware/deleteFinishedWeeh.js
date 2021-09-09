"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFinishedBouqute = void 0;
const user_model_1 = require("../models/user.model");
const DeleteFinishedBouqute = async function () {
    const reantalBouqutesActivate = await user_model_1.User.find({
        finished: true,
    });
    reantalBouqutesActivate.forEach(async (doc) => {
        if (doc && doc.finished) {
            await user_model_1.User.updateOne({ _id: doc._id }, { blocked: true });
        }
    });
};
exports.DeleteFinishedBouqute = DeleteFinishedBouqute;
//# sourceMappingURL=deleteFinishedWeeh.js.map