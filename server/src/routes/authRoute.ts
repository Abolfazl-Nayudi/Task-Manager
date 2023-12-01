import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
const router = Router();

router.route('/register').post(AuthController.register);

router.route('/login').post(AuthController.login);

router.route('/logout').post(AuthController.logout);

router.route('/refresh').post(AuthController.refresh);

export { router };
