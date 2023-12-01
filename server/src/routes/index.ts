import { Router } from 'express';

import { router as todoRoute } from './todoRoute';
import { router as authRoute } from './authRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/todo', todoRoute);

export { router };
