"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string().min(5).trim().required(),
    token: joi_1.default.string().default(null),
});
exports.AuthSchema = AuthSchema;
