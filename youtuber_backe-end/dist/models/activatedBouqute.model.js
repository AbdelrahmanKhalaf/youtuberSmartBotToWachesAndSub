"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAEmails = exports.VAreantalBouquteActivated = exports.ReantalBouquteActivated = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "reantalebouqutes",
    },
    bouquteId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.ReantalBouquteActivated = mongoose_1.default.model("reantaleBouquteActivated", schema);
async function VAreantalBouquteActivated(reantalBouquteActivated) {
    const schema = await {
        userId: joi_1.default.string().required(),
        bouquteId: joi_1.default.string().required(),
        playlistId: joi_1.default.string().required(),
        weekFinished: joi_1.default.boolean().required(),
        Activated: joi_1.default.boolean().required(),
        start: joi_1.default.date().required(),
        end: joi_1.default.date().required(),
        mission: joi_1.default.array().unique(),
        wached: joi_1.default.array().unique(),
        emails: joi_1.default.array().unique(),
        workingHours: joi_1.default.number(),
    };
    return joi_1.default.validate(reantalBouquteActivated, schema);
}
exports.VAreantalBouquteActivated = VAreantalBouquteActivated;
async function VAEmails(reantalBouquteActivated) {
    const schema = await {
        emails: joi_1.default.array().unique(),
        email: joi_1.default.string().email(),
    };
    return joi_1.default.validate(reantalBouquteActivated, schema);
}
exports.VAEmails = VAEmails;
//# sourceMappingURL=activatedBouqute.model.js.map