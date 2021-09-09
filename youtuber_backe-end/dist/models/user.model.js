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
exports.validateUserPlaylist = exports.validateUserEmail = exports.vaildavatar = exports.validateUserPassword = exports.validateUserUpdate = exports.validateUser = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
process.env.SUPPRESS_NO_CONFIG_WARNING = "../models/user.model.ts";
const schema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
schema.methods.generaToken = function () {
    const token = jsonwebtoken_1.default.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        email: this.email,
        name: this.name,
    }, "privateTo");
    return token;
};
exports.User = mongoose_1.default.model("user", schema);
async function validateUser(user) {
    const schema = await {
        name: joi_1.default.string().min(8).max(30).required(),
        email: joi_1.default.string().email().min(8).max(100).required(),
        phone: joi_1.default.number().min(11).required(),
        password: joi_1.default.string().min(8).max(28).required(),
        isAdmin: joi_1.default.boolean(),
        date: joi_1.default.date(),
        address: joi_1.default.string().required().min(11).max(30),
        age: joi_1.default.date().required(),
        gender: joi_1.default.number().required(),
        playlist: joi_1.default.string().required(),
        workdays: joi_1.default.number(),
        daysOff: joi_1.default.number(),
        startDaysWork: joi_1.default.date(),
        endDaysWork: joi_1.default.date(),
        yourChannel: joi_1.default.string().required(),
        workingHours: joi_1.default.number(),
        code: joi_1.default.string().required(),
        codeFrinde: joi_1.default.string().required(),
        avatar: joi_1.default.string().required(),
    };
    return joi_1.default.validate(user, schema);
}
exports.validateUser = validateUser;
async function validateUserUpdate(userUpdate) {
    const schema = await {
        name: joi_1.default.string().min(8).max(315).required(),
        phone: joi_1.default.number().min(11).required(),
        address: joi_1.default.string().required().min(11).max(315),
        password: joi_1.default.string().min(8).max(100).required(),
    };
    return joi_1.default.validate(userUpdate, schema);
}
exports.validateUserUpdate = validateUserUpdate;
async function validateUserPassword(userUpdate) {
    const schema = await {
        password: joi_1.default.string().min(8).max(100).required(),
        newPass: joi_1.default.string().min(8).max(100).required(),
    };
    return joi_1.default.validate(userUpdate, schema);
}
exports.validateUserPassword = validateUserPassword;
async function vaildavatar(userUpdate) {
    const schema = await {
        avatar: joi_1.default.date().required(),
    };
    return joi_1.default.validate(userUpdate, schema);
}
exports.vaildavatar = vaildavatar;
async function validateUserEmail(userUpdate) {
    const schema = await {
        email: joi_1.default.string().min(8).max(100).required(),
        password: joi_1.default.string().min(8).max(100).required(),
    };
    return joi_1.default.validate(userUpdate, schema);
}
exports.validateUserEmail = validateUserEmail;
async function validateUserPlaylist(userUpdate) {
    const schema = await {
        playlist: joi_1.default.string().min(8).max(200).required(),
        password: joi_1.default.string().min(8).max(100).required(),
    };
    return joi_1.default.validate(userUpdate, schema);
}
exports.validateUserPlaylist = validateUserPlaylist;
//# sourceMappingURL=user.model.js.map