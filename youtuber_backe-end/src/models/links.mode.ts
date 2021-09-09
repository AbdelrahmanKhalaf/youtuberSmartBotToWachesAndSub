import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
const schema: Schema = new Schema({
  userId: {
    type: ObjectId,
    ref: "users",
  },
  link: {
    type: String,
  },
});
export const Link = model("link", schema);
