"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;
class AuthUtils {
    static hashPassword(password) {
        const salt = (0, bcrypt_1.genSaltSync)();
        return (0, bcrypt_1.hashSync)(password, salt);
    }
    static comparePassword(password, hashedPassword) {
        return (0, bcrypt_1.compareSync)(password, hashedPassword);
    }
    static createAccessToken(data) {
        return jsonwebtoken_1.default.sign(data, ACCESS_TOKEN);
    }
    static createRefreshToken(data) {
        return jsonwebtoken_1.default.sign(data, REFRESH_TOKEN, { expiresIn: '7d' });
    }
    static verifyToken(token, secret) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded.email;
        }
        catch (error) {
            return null;
        }
    }
    static sendAccessToken(req, res, accessToken) {
        res.json({ token: accessToken });
    }
    static sendRefreshToken(req, res, refreshToken) {
        res.cookie(TOKEN_NAME, refreshToken, { httpOnly: true });
    }
}
exports.AuthUtils = AuthUtils;
