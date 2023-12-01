"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
// get all todos and post todo
router.route('/').get().post();
// get signle todo
router.get('/:id');
// update todo
router.patch('/:id');
// delete todo
router.delete('/:id');
