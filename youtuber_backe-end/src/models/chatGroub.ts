import { Request, Response, Router } from "express";
import { chat } from "googleapis/build/src/apis/chat";
import { date, string } from "joi";
import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import { AuthenticationMiddleware } from "../middleware/auth";
const router: Router = Router();
const schema: Schema = new Schema({
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
export const ChatGoroub = model("chatGroub", schema);
router.get(
  "/",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const chats = await ChatGoroub.find({
        room: res.locals.user.idBouqute,
      }).sort({ date: -1 });
      res.send({ cahts: chats });
    } catch (err) {
      throw err;
    }
  }
);
router.get(
  "/:id",
  AuthenticationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const chats = await ChatGoroub.find({ room: req.params.id }).sort({
        date: -1,
      });
      res.send({ cahts: chats });
    } catch (err) {
      throw err;
    }
  }
);
export default router;
