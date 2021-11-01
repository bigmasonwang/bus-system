import express from 'express';
import busRouter from './bus';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.use('/bus', busRouter);

export default router;
