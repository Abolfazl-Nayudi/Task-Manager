import { Auth } from '../model';
import { Request, Response } from 'express';
import { AuthValidation } from '../validation';
import { AuthUtils } from '../lib/authUtils';

const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;

class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const { error, value } = AuthValidation(req.body);

    if (error) {
      res
        .status(404)
        .json({ success: false, message: error.details, data: '' });
      return;
    }

    const userExists = await Auth.findOne({ email: value.email });

    if (userExists) {
      res
        .status(404)
        .json({ success: false, message: 'user has already exists', data: '' });
    }

    const user = await Auth.create({
      email: value.email,
      password: AuthUtils.hashPassword(value.password),
    });

    res.status(201).json({
      success: true,
      message: 'user successfully created',
      data: { id: user.id, email: user.email },
    });
  }

  static async login(req: Request, res: Response) {
    const { error, value } = AuthValidation(req.body);
    if (error) {
      res
        .status(404)
        .json({ success: false, message: error.details, data: '' });
      return;
    }

    const user = await Auth.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'email or password incorrect',
        data: '',
      });
    }

    const validatePassword = AuthUtils.comparePassword(
      value.password,
      user.password!
    );

    if (!validatePassword) {
      return res.status(404).json({
        success: false,
        message: 'email or password incorrect',
        data: '',
      });
    }

    const accessToken = AuthUtils.createAccessToken({
      id: user._id,
      email: user.email,
    });
    const refreshToken = AuthUtils.createRefreshToken({
      id: user._id,
      email: user.email,
    });
    user.token = refreshToken;
    user.save();

    AuthUtils.sendRefreshToken(req, res, refreshToken);
    AuthUtils.sendAccessToken(req, res, accessToken);
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie(TOKEN_NAME!);
    res
      .status(200)
      .json({ success: true, message: 'logged out successfully', data: '' });
  }

  static async refresh(req: Request, res: Response) {
    const token = req.cookies(`${TOKEN_NAME!}`);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'unauthenticated user', data: '' });
    }

    const payload = AuthUtils.verifyToken(token, TOKEN_NAME!);

    if (!payload) {
      return res
        .status(401)
        .json({ success: false, message: 'unauthenticated user', data: '' });
    }

    const user = await Auth.findOne({ email: payload.email });

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

    const accessToken = AuthUtils.createAccessToken({
      id: user._id,
      email: user.email,
    });
    const refreshToken = AuthUtils.createRefreshToken({
      id: user._id,
      email: user.email,
    });

    user.token = refreshToken;
    user.save();

    AuthUtils.sendRefreshToken(req, res, refreshToken);
    AuthUtils.sendAccessToken(req, res, accessToken);
  }
}

export { AuthController };
