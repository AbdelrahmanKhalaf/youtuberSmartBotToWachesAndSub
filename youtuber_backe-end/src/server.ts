import express, { Application, request, Router } from "express";
import path from "path";
import mongoose, { Schema, disconnect, model } from "mongoose";
import users from "./routers/user.router";
import socketIo, { Server, Socket } from "socket.io";
import login from "./routers/auth.router";
import chanle from "./routers/cahnle.router";
import bouquets from "./routers/bouquets.router";
import reantalBouqutes from "./routers/reantelBouqute.router";
import reantalBouqutesActvated from "./routers/activatedBouqute.router";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";
import { Reast } from "./middleware/restDateBuy";
import {
  AddMisionToUSerAndFree,
  AddMisionToUSerAndPaid,
  AddMisionToUSerAndPaidAndTry,
  AddMisionToUSerTryAndFree,
} from "./middleware/addMissinonToUser";
import { chackUserIsFinishedOrNot } from "./middleware/chackUserFinshedWork";
import addMission from "./routers/addMissionAndChack";
import chatsGroub from "./models/chatGroub";
import { chackUserIsWork } from "./middleware/chackUserISwork";
import { PostMessage } from "./sockets/gruobChat";
import fs from "fs";
import cron from "node-cron";
import shell from "shelljs";
cron.schedule("0 0 0-24/12 * * *", () => {
  Reast();
});
cron.schedule("* * 1-13/12 * * *", () => {
  chackUserIsFinishedOrNot();
  chackUserIsWork();
});
cron.schedule("* * 2-14/12 * * *", () => {
  AddMisionToUSerTryAndFree();
  AddMisionToUSerAndFree();
  AddMisionToUSerAndPaidAndTry();
  AddMisionToUSerAndPaid();
});
mongoose
  .connect(`mongodb://localhost:27017/youtuber`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB...");
  })
  .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
const app: Application = express();
const server = http.createServer(app);
const io: any = socketIo(server);
PostMessage(io);
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())

  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authentication, X-Requested-With"
    );
    next();
  })
  .use(express.json())
  .use("/uploads", express.static("./uploads"))
  .use("/youtuber/api/users/", users)
  .use("/youtuber/api/auth/login", login)
  .use("/youtuber/api/bouquets", bouquets)
  .use("/youtuber/api/bouqute", reantalBouqutes)
  .use("/youtuber/api/bouquteActecidat", reantalBouqutesActvated)
  .use("/youtuber/api/addMission", addMission)
  .use("/youtuber/api/chanle", chanle)
  .use("/youtuber/api/chats", chatsGroub);
//start chack ever 2 hours in day
// setInterval(() => {
//   AddMisionToUSerAndFree();
//   console.log("done");
// }, 60000);
// // chackUserIsFinishedOrNot();
// // AddMisionToUSerAndPaidAndTry();
// AddMisionToUSerTryAndFree();
// setInterval(() => {
//   console.log("done");
// }, 4320000);

// console.log(new Date(new Date().getTime()));

const PORT: any = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listing now to PORT ${PORT}...`);
});
/// becrypt.compare => to Comparison encrypt
