import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { boolean, date, number, string } from "joi";
import { addDays } from "../helpers/add.days";
import { add } from "lodash";
const EndWeak = new Date(addDays(new Date(Date.now()), 7));

const schema: Schema = new Schema({
  idBouqute: {
    type: Schema.Types.ObjectId,
    ref: "bouqute",
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  idChnnale: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  buy: {
    type: Boolean,
    required: true,
    default: false,
  },
  dataOut: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dataAccsept: {
    type: Date,
  },
  startWeak: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  endWeak: {
    type: Date,
    default: EndWeak,
    require: true,
  },
  weakFinshed: {
    type: Boolean,
    default: false,
    required: true,
  },
});
export interface IReantalBouqutes {
  idBouqute: Schema.Types.ObjectId;
  idUser: Schema.Types.ObjectId;
  idChnnale: String;
  start: Date;
  end: Date;
  buy: Boolean;
  dataOut: Date;
  dateAccsept: Date;
  startWeak: Date;
  endWeak: Date;
  weakFinshed: Boolean;
}
export const ReantalBouqutes = mongoose.model("reantaleBouqute", schema);
export async function validateReantalBouqute(reantaleBouqute: any) {
  const schema = await {
    idBouqute: joi.string().required(),
    idUser: joi.string().required(),
    idChnnale: joi.string(),
    start: joi.date(),
    end: joi.date(),
    buy: joi.boolean(),
    dateOut: joi.date(),
    dateAccsept: joi.date(),
  };
}
export async function validateAccseptUser(reantaleBouqute: any) {
  const schema = await {
    buy: joi.boolean().required(),
  };
  return joi.validate(reantaleBouqute, schema);
}
