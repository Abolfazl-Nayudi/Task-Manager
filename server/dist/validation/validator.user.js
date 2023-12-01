"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const UserSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    fullName: joi_1.default.string().trim().required(),
    skills: joi_1.default.array().items(joi_1.default.string()).min(2).required(),
    age: joi_1.default.number().required(),
    githubAddress: joi_1.default.string().trim().required(),
    linkedInAddress: joi_1.default.string().trim().required(),
    language: joi_1.default.string().required(),
});
exports.UserSchema = UserSchema;
