"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const model_1 = require("../model");
const validation_1 = require("../validation");
const authUtils_1 = require("../lib/authUtils");
const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { error, value } = (0, validation_1.AuthValidation)(req.body);
            if (error) {
                res
                    .status(404)
                    .json({ success: false, message: error.details, data: '' });
                return;
            }
            const userExists = yield model_1.Auth.findOne({ email: value.email });
            if (userExists) {
                res
                    .status(404)
                    .json({ success: false, message: 'user has already exists', data: '' });
            }
            const user = yield model_1.Auth.create({
                email: value.email,
                password: authUtils_1.AuthUtils.hashPassword(value.password),
            });
            res.status(201).json({
                success: true,
                message: 'user successfully created',
                data: { id: user.id, email: user.email },
            });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, validation_1.AuthValidation)(req.body);
            if (error) {
                res
                    .status(404)
                    .json({ success: false, message: error.details, data: '' });
                return;
            }
            const user = yield model_1.Auth.findOne({ email: value.email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'email or password incorrect',
                    data: '',
                });
            }
            const validatePassword = authUtils_1.AuthUtils.comparePassword(value.password, user.password);
            if (!validatePassword) {
                return res.status(404).json({
                    success: false,
                    message: 'email or password incorrect',
                    data: '',
                });
            }
            const accessToken = authUtils_1.AuthUtils.createAccessToken({
                id: user._id,
                email: user.email,
            });
            const refreshToken = authUtils_1.AuthUtils.createRefreshToken({
                id: user._id,
                email: user.email,
            });
            user.token = refreshToken;
            user.save();
            res.cookie(TOKEN_NAME, refreshToken, { httpOnly: true });
            const cookie = res.cookie('test', 'hello');
            console.log('cookie', cookie);
            // AuthUtils.sendRefreshToken(req, res, refreshToken);
            authUtils_1.AuthUtils.sendAccessToken(req, res, accessToken);
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie(TOKEN_NAME);
            res
                .status(200)
                .json({ success: true, message: 'logged out successfully', data: '' });
        });
    }
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies(`${TOKEN_NAME}`);
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unauthenticated user', data: '' });
            }
            const payload = authUtils_1.AuthUtils.verifyToken(token, TOKEN_NAME);
            if (!payload) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unauthenticated user', data: '' });
            }
            const user = yield model_1.Auth.findOne({ email: payload.email });
            if (!user) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unauthenticated user', data: '' });
            }
            if (user.token !== token) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unauthenticated user', data: '' });
            }
            const accessToken = authUtils_1.AuthUtils.createAccessToken({
                id: user._id,
                email: user.email,
            });
            const refreshToken = authUtils_1.AuthUtils.createRefreshToken({
                id: user._id,
                email: user.email,
            });
            user.token = refreshToken;
            user.save();
            authUtils_1.AuthUtils.sendRefreshToken(req, res, refreshToken);
            authUtils_1.AuthUtils.sendAccessToken(req, res, accessToken);
        });
    }
}
exports.AuthController = AuthController;
