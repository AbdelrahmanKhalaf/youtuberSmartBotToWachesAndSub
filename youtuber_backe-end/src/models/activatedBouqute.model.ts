import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { date, number, string } from "joi";
const schema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "reantalebouqutes",
  },
  bouquteId: {
    type: Schema.Types.ObjectId,
    ref: "reantalebouqutes",
  },
  playlistId: {
    type: String,
    required: true,
  },
  channalId: {
    type: String,
    required: true,
  },
  start: Date,
  end: Date,
  weekFinished: { type: Boolean, default: false },
  Activated: { type: Boolean, default: false },
  mission: {
    type: [
      {
        userId: String,
        playlistId: String,
      },
    ],

    unique: true,
  },
  wached: {
    type: [
      {
        userId: String,
        playlistId: String,
      },
    ],

    unique: true,
  },
  emails: {
    type: [
      {
        IdEmail: String,
        name: String,
        avatar: String,
        tokenChannale: String,
        expiry_date: Date,
        dateOut: {
          type: Date,
          default: Date.now(),
        },
        RequestSub: {
          type: [
            {
              name: String,
              avatar: String,
              IdChannal: String,
              dateOut: {
                type: Date,
                default: Date.now(),
              },
            },
          ],
        },
        Sub: {
          type: [
            {
              name: String,
              avatar: String,
              IdChannal: String,
              dateOut: {
                type: Date,
                default: Date.now(),
              },
            },
          ],
        },
      },
    ],
  },
  workingHours: {
    type: Number,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});
export interface IReantalBouquteActivated {
  userId: Schema.Types.ObjectId;
  bouquteId: Schema.Types.ObjectId;
  playlistId: String;
  start: Date;
  end: Date;
  weekFinished: Boolean;
  Activated: Boolean;
  mission: Array<String>;
  wached: Array<String>;
  emails: Array<String>;
  workingHours: number;
}
export const ReantalBouquteActivated = mongoose.model(
  "reantaleBouquteActivated",
  schema
);
export async function VAreantalBouquteActivated(reantalBouquteActivated: any) {
  const schema = await {
    userId: joi.string().required(),
    bouquteId: joi.string().required(),
    playlistId: joi.string().required(),
    weekFinished: joi.boolean().required(),
    Activated: joi.boolean().required(),
    start: joi.date().required(),
    end: joi.date().required(),
    mission: joi.array().unique(),
    wached: joi.array().unique(),
    emails: joi.array().unique(),
    workingHours: joi.number(),
  };
  return joi.validate(reantalBouquteActivated, schema);
}
export async function VAEmails(reantalBouquteActivated: any) {
  const schema = await {
    emails: joi.array().unique(),
    email: joi.string().email(),
  };
  return joi.validate(reantalBouquteActivated, schema);
}
