"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongodb_1.ObjectId,
        ref: "users",
    },
    link: {
        type: String,
    },
});
exports.Link = mongoose_1.model("link", schema);
//# sourceMappingURL=links.mode.js.map