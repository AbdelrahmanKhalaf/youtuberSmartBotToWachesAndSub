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
exports.validateAdmin = exports.Bouquet = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const schema = new mongoose_1.Schema({
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
exports.Bouquet = mongoose_1.default.model("bouquet", schema);
async function validateAdmin(bouquet) {
    const schema = await {
        title: joi_1.default.string().required(),
        playlistRequired: joi_1.default.number().required(),
        dailyWorkingHours: joi_1.default.number().required(),
        numberOfGrids: joi_1.default.number().required(),
        monthlyInternetConsumption: joi_1.default.number().required(),
        daysOff: joi_1.default.number().required(),
        dailySubscriberSum: joi_1.default.number().required(),
        collectorOfDailyHours: joi_1.default.number().required(),
        price: joi_1.default.number().required(),
        numberOfDays: joi_1.default.number().required(),
        des: joi_1.default.string().required(),
        keyword: joi_1.default.string().required(),
        block: joi_1.default.number(),
    };
    return joi_1.default.validate(bouquet, schema);
}
exports.validateAdmin = validateAdmin;
//# sourceMappingURL=bouquets.model.js.map