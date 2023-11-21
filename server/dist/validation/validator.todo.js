"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const TodoSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    title: joi_1.default.string().max(20).required(),
    description: joi_1.default.string().required(),
    isCompleted: joi_1.default.boolean().default(false),
});
exports.TodoSchema = TodoSchema;
