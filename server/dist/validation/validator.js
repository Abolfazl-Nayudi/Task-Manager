"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.TodoValidation = exports.AuthValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validator = (schema) => (payload) => schema.validate(payload);
const AuthSchema = joi_1.default.object({
    username: joi_1.default.string().min(5).max(20).required(),
    password: joi_1.default.string().min(5).required(),
    token: joi_1.default.string().default(null),
});
const TodoSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    title: joi_1.default.string().max(20).required(),
    description: joi_1.default.string().required(),
    isCompleted: joi_1.default.boolean().default(false),
});
const UserSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    fullName: joi_1.default.string().required(),
    skills: joi_1.default.array().items(joi_1.default.string()).min(2).required(),
    age: joi_1.default.number().required(),
    githubAddress: joi_1.default.string().required(),
    linkedInAddress: joi_1.default.string().required(),
    language: joi_1.default.string().required(),
});
const AuthValidation = validator(AuthSchema);
exports.AuthValidation = AuthValidation;
const TodoValidation = validator(TodoSchema);
exports.TodoValidation = TodoValidation;
const UserValidation = validator(UserSchema);
exports.UserValidation = UserValidation;
