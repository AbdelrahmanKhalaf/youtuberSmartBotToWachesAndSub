import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { date, number, string } from "joi";
import { DateTime } from "luxon";
const schema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  playlistRequired: {
    type: Number,
    required: true,
  },
  dailyWorkingHours: {
    type: Number,
    required: true,
  },
  numberOfGrids: {
    type: Number,
    required: true,
  },
  monthlyInternetConsumption: {
    type: Number,
    required: true,
  },
  daysOff: {
    type: Number,
    required: true,
  },
  dailySubscriberSum: {
    type: Number,
    required: true,
  },
  collectorOfDailyHours: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  block: {
    type: Number,
    required: true,
    default: 0,
  },
});
export interface IBou extends Document {
  playlistRequired: Number;
  dailyWorkingHours: Number;
  numberOfGrids: Number;
  monthlyInternetConsumption: Number;
  daysOff: Number;
  dailySubscriberSum: Number;
  collectorOfDailyHours: Number;
  price: Number;
  title: String;
  date: Date;
  numberOfDays: Number;
  des: String;
  keyword: String;
  block: number;
}
export const Bouquet = mongoose.model("bouquet", schema);
export async function validateAdmin(bouquet: any) {
  const schema = await {
    title: joi.string().required(),
    playlistRequired: joi.number().required(),
    dailyWorkingHours: joi.number().required(),
    numberOfGrids: joi.number().required(),
    monthlyInternetConsumption: joi.number().required(),
    daysOff: joi.number().required(),
    dailySubscriberSum: joi.number().required(),
    collectorOfDailyHours: joi.number().required(),
    price: joi.number().required(),
    numberOfDays: joi.number().required(),
    des: joi.string().required(),
    keyword: joi.string().required(),
    block: joi.number(),
  };
  return joi.validate(bouquet, schema);
}
