"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMisionToUSerAndPaid = exports.AddMisionToUSerAndPaidAndTry = exports.AddMisionToUSerAndFree = exports.AddMisionToUSerTryAndFree = void 0;
const user_model_1 = require("../models/user.model");
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const search_1 = require("../helpers/search");
const bouquets_model_1 = require("../models/bouquets.model");
const AddMisionToUSerTryAndFree = async () => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "مجانيه" });
    const users = await user_model_1.User.find({
        weekFinished: false,
        activated: false,
        blocked: false,
        idBouqute: bouquteId[0]._id,
    });
    for (let i = 0; users.length > i; i++) {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouquteId[0]._id,
            weekFinished: false,
            Activated: false,
            blocked: false,
            userId: { $ne: users[i]._id },
        });
        const reantalCuryntUser = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            userId: users[i]._id,
            bouquteId: bouquteId[0]._id,
            weekFinished: false,
            Activated: false,
            blocked: false,
        });
        for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
            if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
            }
            if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
            }
            if (reantalCuryntUser[0].mission.length <= 8 &&
                !resulltChackMission &&
                !resulltChackWached &&
                String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                (reantalCuryntUser[0].mission.length += 1) <= 8) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                    $push: {
                        mission: {
                            userId: reantalBouquteActivated[BA].userId,
                            playlistId: reantalBouquteActivated[BA].playlistId,
                        },
                        slice: 1,
                    },
                });
            }
        }
        if (reantalCuryntUser[0].mission.length < 8) {
            for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
                if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                    var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
                }
                if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                    var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
                }
                if (reantalCuryntUser[0].mission.length <= 8 &&
                    !resulltChackMission &&
                    resulltChackWached &&
                    String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                    (reantalCuryntUser[0].mission.length += 1) <= 8) {
                    await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                        $push: {
                            mission: {
                                userId: reantalBouquteActivated[BA].userId,
                                playlistId: reantalBouquteActivated[BA].playlistId,
                            },
                            slice: 1,
                        },
                        $pull: {
                            wached: { userId: reantalBouquteActivated[BA].userId },
                        },
                    });
                }
            }
        }
    }
    return true;
};
exports.AddMisionToUSerTryAndFree = AddMisionToUSerTryAndFree;
const AddMisionToUSerAndFree = async () => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "مجانيه" });
    const users = await user_model_1.User.find({
        weekFinished: true,
        activated: true,
        blocked: false,
        idBouqute: bouquteId[0]._id,
    });
    if (users == [])
        return console.log("لا يوجد مستخدمين تم تفعيل باقتهم في الباقه المجانيه");
    for (let i = 0; users.length > i; i++) {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouquteId[0]._id,
            weekFinished: true,
            Activated: true,
            blocked: false,
            userId: { $ne: users[i]._id },
        });
        const reantalCuryntUser = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            userId: users[i]._id,
            bouquteId: bouquteId[0]._id,
            weekFinished: true,
            Activated: true,
            blocked: false,
        });
        for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
            if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
            }
            if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
            }
            if (reantalCuryntUser[0].mission.length <= 8 &&
                !resulltChackMission &&
                !resulltChackWached &&
                String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                (reantalCuryntUser[0].mission.length += 1) <= 8) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                    $push: {
                        mission: {
                            userId: reantalBouquteActivated[BA].userId,
                            playlistId: reantalBouquteActivated[BA].playlistId,
                        },
                        slice: 1,
                    },
                });
            }
        }
        if (reantalCuryntUser[0].mission.length < 8) {
            for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
                if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                    var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
                }
                if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                    var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
                }
                if (reantalCuryntUser[0].mission.length <= 8 &&
                    !resulltChackMission &&
                    resulltChackWached &&
                    String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                    (reantalCuryntUser[0].mission.length += 1) <= 8) {
                    await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                        $push: {
                            mission: {
                                userId: reantalBouquteActivated[BA].userId,
                                playlistId: reantalBouquteActivated[BA].playlistId,
                            },
                            slice: 1,
                        },
                        $pull: {
                            wached: { userId: reantalBouquteActivated[BA].userId },
                        },
                    });
                }
            }
        }
    }
    return true;
};
exports.AddMisionToUSerAndFree = AddMisionToUSerAndFree;
const AddMisionToUSerAndPaidAndTry = async () => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "ثلاث شهور" });
    const users = await user_model_1.User.find({
        idBouqute: bouquteId[0]._id,
        weekFinished: false,
        activated: false,
        blocked: false,
    });
    for (let i = 0; users.length > i; i++) {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouquteId[0]._id,
            weekFinished: false,
            Activated: false,
            blocked: false,
            userId: { $ne: users[i]._id },
        });
        const reantalCuryntUser = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            userId: users[i]._id,
            bouquteId: bouquteId[0]._id,
            weekFinished: false,
            Activated: false,
            blocked: false,
        });
        for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
            if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
            }
            if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
            }
            if (reantalCuryntUser[0].mission.length <= 9 &&
                !resulltChackMission &&
                !resulltChackWached &&
                String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                (reantalCuryntUser[0].mission.length += 1) <= 9) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                    $push: {
                        mission: {
                            userId: reantalBouquteActivated[BA].userId,
                            playlistId: reantalBouquteActivated[BA].playlistId,
                        },
                        slice: 1,
                    },
                });
            }
        }
        if (reantalCuryntUser[0].mission.length < 9) {
            for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
                if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                    var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
                }
                if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                    var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
                }
                if (reantalCuryntUser[0].mission.length <= 9 &&
                    !resulltChackMission &&
                    resulltChackWached &&
                    String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                    (reantalCuryntUser[0].mission.length += 1) <= 9) {
                    await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                        $push: {
                            mission: {
                                userId: reantalBouquteActivated[BA].userId,
                                playlistId: reantalBouquteActivated[BA].playlistId,
                            },
                            slice: 1,
                        },
                        $pull: {
                            wached: { userId: reantalBouquteActivated[BA].userId },
                        },
                    });
                }
            }
        }
    }
};
exports.AddMisionToUSerAndPaidAndTry = AddMisionToUSerAndPaidAndTry;
const AddMisionToUSerAndPaid = async () => {
    const bouquteId = await bouquets_model_1.Bouquet.find({ title: "ثلاث شهور" });
    const users = await user_model_1.User.find({
        weekFinished: true,
        activated: true,
        blocked: false,
        idBouqute: bouquteId[0]._id,
    });
    if (users == [])
        return console.log("لا يوجد مستخدمين تم افعيل باقتهم في باقه ثلاث شهور");
    for (let i = 0; users.length > i; i++) {
        const reantalBouquteActivated = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            bouquteId: bouquteId[0]._id,
            weekFinished: true,
            Activated: true,
            blocked: false,
            userId: { $ne: users[i]._id },
        });
        const reantalCuryntUser = await activatedBouqute_model_1.ReantalBouquteActivated.find({
            userId: users[i]._id,
            bouquteId: bouquteId[0]._id,
            weekFinished: true,
            Activated: true,
            blocked: false,
        });
        for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
            if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
            }
            if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
            }
            if (reantalCuryntUser[0].mission.length <= 9 &&
                !resulltChackMission &&
                !resulltChackWached &&
                String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                (reantalCuryntUser[0].mission.length += 1) <= 9) {
                await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                    $push: {
                        mission: {
                            userId: reantalBouquteActivated[BA].userId,
                            playlistId: reantalBouquteActivated[BA].playlistId,
                        },
                        slice: 1,
                    },
                });
            }
        }
        if (reantalCuryntUser[0].mission.length < 9) {
            for (let BA = 0; reantalBouquteActivated.length > BA; BA++) {
                if (reantalCuryntUser && reantalCuryntUser[0].mission !== []) {
                    var resulltChackMission = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].mission);
                }
                if (reantalCuryntUser && reantalCuryntUser[0].wached !== []) {
                    var resulltChackWached = search_1.userExists(String(reantalBouquteActivated[BA].userId), reantalCuryntUser[0].wached);
                }
                if (reantalCuryntUser[0].mission.length <= 9 &&
                    !resulltChackMission &&
                    resulltChackWached &&
                    String(bouquteId[0]._id) == String(reantalCuryntUser[0].bouquteId) &&
                    (reantalCuryntUser[0].mission.length += 1) <= 9) {
                    await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({ userId: users[i]._id }, {
                        $push: {
                            mission: {
                                userId: reantalBouquteActivated[BA].userId,
                                playlistId: reantalBouquteActivated[BA].playlistId,
                            },
                            slice: 1,
                        },
                        $pull: {
                            wached: { userId: reantalBouquteActivated[BA].userId },
                        },
                    });
                }
            }
        }
    }
    return true;
};
exports.AddMisionToUSerAndPaid = AddMisionToUSerAndPaid;
//# sourceMappingURL=addMissinonToUser.js.map