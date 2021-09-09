"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const socket_io_1 = __importDefault(require("socket.io"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const cahnle_router_1 = __importDefault(require("./routers/cahnle.router"));
const bouquets_router_1 = __importDefault(require("./routers/bouquets.router"));
const reantelBouqute_router_1 = __importDefault(require("./routers/reantelBouqute.router"));
const activatedBouqute_router_1 = __importDefault(require("./routers/activatedBouqute.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const restDateBuy_1 = require("./middleware/restDateBuy");
const addMissinonToUser_1 = require("./middleware/addMissinonToUser");
const chackUserFinshedWork_1 = require("./middleware/chackUserFinshedWork");
const addMissionAndChack_1 = __importDefault(require("./routers/addMissionAndChack"));
const chatGroub_1 = __importDefault(require("./models/chatGroub"));
const chackUserISwork_1 = require("./middleware/chackUserISwork");
const gruobChat_1 = require("./sockets/gruobChat");
const node_cron_1 = __importDefault(require("node-cron"));
node_cron_1.default.schedule("* * 5 * * *", () => {
    restDateBuy_1.Reast();
});
node_cron_1.default.schedule("* * 22 * * *", () => {
    chackUserFinshedWork_1.chackUserIsFinishedOrNot();
    chackUserISwork_1.chackUserIsWork();
});
node_cron_1.default.schedule("* * * 1 * *", () => {
    addMissinonToUser_1.AddMisionToUSerTryAndFree();
    addMissinonToUser_1.AddMisionToUSerAndFree();
    addMissinonToUser_1.AddMisionToUSerAndPaidAndTry();
    addMissinonToUser_1.AddMisionToUSerAndPaid();
});
mongoose_1.default
    .connect(`mongodb+srv://abdo2020:01123689625@temwork-vxavl.mongodb.net/youtuber?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("connected to mongoDB...");
})
    .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
gruobChat_1.PostMessage(io);
app
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .use(cookie_parser_1.default())
    .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authentication, X-Requested-With");
    next();
})
    .use(express_1.default.json())
    .use("/uploads", express_1.default.static("./uploads"))
    .use("/youtuber/api/users/", user_router_1.default)
    .use("/youtuber/api/auth/login", auth_router_1.default)
    .use("/youtuber/api/bouquets", bouquets_router_1.default)
    .use("/youtuber/api/bouqute", reantelBouqute_router_1.default)
    .use("/youtuber/api/bouquteActecidat", activatedBouqute_router_1.default)
    .use("/youtuber/api/addMission", addMissionAndChack_1.default)
    .use("/youtuber/api/chanle", cahnle_router_1.default)
    .use("/youtuber/api/chats", chatGroub_1.default);
console.log(new Date(new Date().getTime()));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listing now to PORT ${PORT}...`);
});
//# sourceMappingURL=server.js.map