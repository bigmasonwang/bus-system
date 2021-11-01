import express from 'express';
import busRouter from './bus';
import stopRouter from './stop';
import routeRouter from './route';
import lineRouter from './line';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.use('/bus', busRouter);

router.use('/stop', stopRouter);

router.use('/route', routeRouter);

router.use('/line', lineRouter);

export default router;
