"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conversationSchema = new mongoose_1.default.Schema({
    groupTitle: {
        type: String,
    },
    members: {
        type: Array,
    },
    lastMessage: {
        type: String,
    },
    lastMessageId: {
        type: String,
    },
    unreadCount: {
        type: Number,
    },
}, { timestamps: true });
const conversationModel = mongoose_1.default.model("Conversation", conversationSchema);
exports.default = conversationModel;
