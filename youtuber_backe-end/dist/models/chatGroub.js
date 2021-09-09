"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGoroub = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const auth_1 = require("../middleware/auth");
const router = express_1.Router();
const schema = new mongoose_1.Schema({
    userName: {
        type: String,
    },
    massage: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    room: {
        type: String,
    },
    idChat: {
        type: String,
    },
});
exports.ChatGoroub = mongoose_1.model("chatGroub", schema);
router.get("/", auth_1.AuthenticationMiddleware, async (req, res) => {
    try {
        const chats = await exports.ChatGoroub.find({
            room: res.locals.user.idBouqute,
        }).sort({ date: -1 });
        res.send({ cahts: chats });
    }
    catch (err) {
        throw err;
    }
});
router.get("/:id", auth_1.AuthenticationMiddleware, async (req, res) => {
    try {
        const chats = await exports.ChatGoroub.find({ room: req.params.id }).sort({
            date: -1,
        });
        res.send({ cahts: chats });
    }
    catch (err) {
        throw err;
    }
});
exports.default = router;
//# sourceMappingURL=chatGroub.js.map