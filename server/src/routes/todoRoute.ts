import { Router } from 'express';

const router = Router();

// get all todos and post todo
router.route('/').get().post();

// get signle todo
router.get('/:id');

// update todo
router.patch('/:id');

// delete todo
router.delete('/:id');

export { router };
