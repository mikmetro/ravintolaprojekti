import express from 'express';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import itemRouter from './routes/item-router.js';
import orderRouter from './routes/order-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/items', itemRouter);
router.use('/orders', orderRouter);

export default router;
