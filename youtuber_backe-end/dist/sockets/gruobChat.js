"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessage = void 0;
const activatedBouqute_model_1 = require("../models/activatedBouqute.model");
const user_model_1 = require("../models/user.model");
const chatGroub_1 = require("../models/chatGroub");
async function PostMessage(io) {
    io.on("connection", (socket) => {
        socket.on("join", (room) => {
            socket.join(room.room);
            console.log("user is join");
        });
        const start = Date.now();
        socket.on("createMasg", (msg) => {
            const cahts = new chatGroub_1.ChatGoroub({
                userName: msg.sender,
                massage: msg.mas,
                room: msg.room,
                idChat: socket.id,
            });
            cahts.save();
            io.to(msg.room).emit("newMasagee", {
                text: msg.mas,
                from: msg.sender,
            });
        });
        let roomId = "";
        let date;
        let userId;
        socket.on("roomWorak", (room) => {
            roomId = room.id;
            date = room.date;
            userId = room.userId;
            socket.join(room.id);
            socket.emit("server", "you have connected to a public room");
            io.to(room.id).emit("server", socket.id + " has connected to this room");
        });
        socket.on("disconnect", async function () {
            const user = await user_model_1.User.find({ _id: userId });
            if (user != (undefined && []) &&
                user[0].workingHours != ("" && 0 && undefined)) {
                const date2 = user[0].workingHours - (Date.now() - date);
                const bouqute = await activatedBouqute_model_1.ReantalBouquteActivated.find({
                    userId: userId,
                });
                console.log(user[0].workingHours - (Date.now() - date));
                const updateBouq = await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({
                    userId: userId,
                }, {
                    $set: {
                        workingHours: date2,
                    },
                });
                const updateUser = await user_model_1.User.updateOne({
                    _id: userId,
                }, {
                    $set: {
                        workingHours: date2,
                    },
                });
                socket.leave(roomId);
            }
        });
        socket.on("countUser", async (data) => {
            const user = await user_model_1.User.find({ _id: data.userId });
            if (user != (undefined && []) &&
                user[0].workingHours != ("" && 0 && undefined)) {
                const bouqute = await activatedBouqute_model_1.ReantalBouquteActivated.find({
                    userId: data.userId,
                });
                const date = user[0].workingHours - data.date;
                const updateBouq = await activatedBouqute_model_1.ReantalBouquteActivated.updateOne({
                    userId: data.userId,
                }, {
                    $set: {
                        workingHours: date,
                    },
                });
                const updateUser = await user_model_1.User.updateOne({
                    _id: data.userId,
                }, {
                    $set: {
                        workingHours: date,
                    },
                });
            }
        });
    });
}
exports.PostMessage = PostMessage;
//# sourceMappingURL=gruobChat.js.map