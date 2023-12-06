import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';
const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;
class AuthUtils {
  static hashPassword(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }

  static comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  static createAccessToken(data: object): string {
    return jwt.sign(data, ACCESS_TOKEN!);
  }

  static createRefreshToken(data: object): string {
    return jwt.sign(data, REFRESH_TOKEN!, { expiresIn: '7d' });
  }

  static verifyToken(token: string, secret: string) {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return decoded.email;
    } catch (error) {
      return null;
    }
  }

  static sendAccessToken(req: Request, res: Response, accessToken: string) {
    res.json({ token: accessToken });
  }

  static sendRefreshToken(req: Request, res: Response, refreshToken: string) {
    res.cookie(TOKEN_NAME!, refreshToken, { httpOnly: true });
  }
}

export { AuthUtils };
