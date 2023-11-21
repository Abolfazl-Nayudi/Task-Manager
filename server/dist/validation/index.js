"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.TodoValidation = exports.AuthValidation = void 0;
const validator_auth_1 = require("./validator.auth");
const validator_todo_1 = require("./validator.todo");
const validator_user_1 = require("./validator.user");
const validator = (schema) => {
    return (payload) => schema.validate(payload);
};
const AuthValidation = validator(validator_auth_1.AuthSchema);
exports.AuthValidation = AuthValidation;
const TodoValidation = validator(validator_todo_1.TodoSchema);
exports.TodoValidation = TodoValidation;
const UserValidation = validator(validator_user_1.UserSchema);
exports.UserValidation = UserValidation;
