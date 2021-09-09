import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { boolean, date, number, string } from "joi";
import jwt from "jsonwebtoken";
process.env.SUPPRESS_NO_CONFIG_WARNING = "../models/user.model.ts";
const schema: Schema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  age: {
    type: Date,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    maxlength: 315,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  avatar: {
    type: String,
    default: "uploads/avatar_1587657175473.png",
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 2015,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
    minlength: 11,
    maxlength: 30,
  },
  resetLink: {
    type: String,
    default: "",
  },
  verify: {
    type: Boolean,
    default: false,
  },

  playlist: {
    type: String,
    required: true,
  },
  workdays: {
    type: Number,
  },
  daysOff: {
    type: Number,
  },
  startDaysWork: {
    type: Date,
  },
  endDaysWork: {
    type: Date,
  },
  yourChannel: {
    type: String,
    required: true,
  },
  workingHours: {
    type: Number,
  },
  idBouqute: {
    type: Schema.Types.ObjectId,
    ref: "reantalBouqute",
  },
  weekFinished: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    required: true,
  },
  codeFrinde: {
    type: String,
    required: true,
    default: "02010300",
  },
  activated: {
    type: Boolean,
    default: false,
  },
});
export interface Iusers extends Document {
  name: String;
  email: String;
  password: String;
  isAdmin?: boolean;
  date?: Date;
  phone: String;
  address: string;
  age: Date;
  gender: number;
  playlist: string;
  workdays: number;
  daysOff: number;
  startDaysWork: Date;
  endDaysWork: Date;
  _id: ObjectID;
  yourChannel: String;
  workingHours: Number;
  avatar?: String;
  idBouqute: Schema.Types.ObjectId;
  weekFinished: boolean;
  blocked: boolean;
  finished: boolean;
  channals: Array<String>;
  code: String;
  codeFrinde: String;
  resetLink: String;
}
schema.methods.generaToken = function (): any {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      email: this.email,
      name: this.name,
    },
    "privateTo"
  );
  return token;
};
export const User = mongoose.model("user", schema);
export async function validateUser(user: any) {
  const schema = await {
    name: joi.string().min(8).max(30).required(),
    email: joi.string().email().min(8).max(100).required(),
    phone: joi.number().min(11).required(),
    password: joi.string().min(8).max(28).required(),
    isAdmin: joi.boolean(),
    date: joi.date(),
    address: joi.string().required().min(11).max(30),
    age: joi.date().required(),
    gender: joi.number().required(),
    playlist: joi.string().required(),
    workdays: joi.number(),
    daysOff: joi.number(),
    startDaysWork: joi.date(),
    endDaysWork: joi.date(),
    yourChannel: joi.string().required(),
    workingHours: joi.number(),
    code: joi.string().required(),
    codeFrinde: joi.string().required(),
    avatar: joi.string().required(),
  };
  return joi.validate(user, schema);
}
export async function validateUserUpdate(userUpdate: any) {
  const schema = await {
    name: joi.string().min(8).max(315).required(),
    phone: joi.number().min(11).required(),
    address: joi.string().required().min(11).max(315),
    password: joi.string().min(8).max(100).required(),
  };
  return joi.validate(userUpdate, schema);
}
export async function validateUserPassword(userUpdate: any) {
  const schema = await {
    password: joi.string().min(8).max(100).required(),
    newPass: joi.string().min(8).max(100).required(),
  };
  return joi.validate(userUpdate, schema);
}
export async function vaildavatar(userUpdate: any) {
  const schema = await {
    avatar: joi.date().required(),
  };
  return joi.validate(userUpdate, schema);
}
export async function validateUserEmail(userUpdate: any) {
  const schema = await {
    email: joi.string().min(8).max(100).required(),
    password: joi.string().min(8).max(100).required(),
  };
  return joi.validate(userUpdate, schema);
}
export async function validateUserPlaylist(userUpdate: any) {
  const schema = await {
    playlist: joi.string().min(8).max(200).required(),
    password: joi.string().min(8).max(100).required(),
  };
  return joi.validate(userUpdate, schema);
}
