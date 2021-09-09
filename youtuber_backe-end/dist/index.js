"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
io.on("connection", (socket) => {
    console.log("new user connection");
    socket.on("serverListin", (data) => {
        console.log("server is listin", data);
    });
    socket.on("sendMsg", () => {
        io.to("myRoom").emit("newMsg");
    });
    socket.on("joinRoom", () => {
        socket.join("myRoom");
    });
    socket.emit("ServerEmit");
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
});
server.listen(4000, () => {
    console.log("server is listen");
});
//# sourceMappingURL=index.js.map