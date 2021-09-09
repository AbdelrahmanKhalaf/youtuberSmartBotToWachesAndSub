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
exports.validateAccseptUser = exports.validateReantalBouqute = exports.ReantalBouqutes = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const add_days_1 = require("../helpers/add.days");
const EndWeak = new Date(add_days_1.addDays(new Date(Date.now()), 7));
const schema = new mongoose_1.Schema({
    idBouqute: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "bouqute",
        required: true,
    },
    idUser: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.ReantalBouqutes = mongoose_1.default.model("reantaleBouqute", schema);
async function validateReantalBouqute(reantaleBouqute) {
    const schema = await {
        idBouqute: joi_1.default.string().required(),
        idUser: joi_1.default.string().required(),
        idChnnale: joi_1.default.string(),
        start: joi_1.default.date(),
        end: joi_1.default.date(),
        buy: joi_1.default.boolean(),
        dateOut: joi_1.default.date(),
        dateAccsept: joi_1.default.date(),
    };
}
exports.validateReantalBouqute = validateReantalBouqute;
async function validateAccseptUser(reantaleBouqute) {
    const schema = await {
        buy: joi_1.default.boolean().required(),
    };
    return joi_1.default.validate(reantaleBouqute, schema);
}
exports.validateAccseptUser = validateAccseptUser;
//# sourceMappingURL=reantelBouqute.model.js.map