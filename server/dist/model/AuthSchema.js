"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AuthSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
    },
    token: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
exports.AuthSchema = AuthSchema;
