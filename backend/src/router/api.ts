import express from 'express';
import busRouter from './bus';
import stopRouter from './stop';
import routeRouter from './route';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.use('/bus', busRouter);

router.use('/stop', stopRouter);

router.use('/route', routeRouter);

export default router;
