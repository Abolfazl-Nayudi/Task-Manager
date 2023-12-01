"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.Auth = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = require("./UserSchema");
const TodoSchema_1 = require("./TodoSchema");
const AuthSchema_1 = require("./AuthSchema");
const User = mongoose_1.default.model('users', UserSchema_1.UserSchema);
exports.User = User;
const Auth = mongoose_1.default.model('auth', AuthSchema_1.AuthSchema);
exports.Auth = Auth;
const Todo = mongoose_1.default.model('todo', TodoSchema_1.TodoSchema);
exports.Todo = Todo;
