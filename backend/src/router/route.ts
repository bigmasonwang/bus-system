import express from 'express';
import {
  deleteRoute,
  getRouteByName,
  getRoutes,
  postRoute,
  postStopToRoute,
} from '../controller/route';

const router = express.Router();

/** GET all routes */
router.get('/', getRoutes);

/** GET a route by name */
router.get('/:name', getRouteByName);

/** POST a route */
router.post('/', postRoute);

/** DELETE a route */
router.delete('/:name', deleteRoute);

/** POST stop to route */
router.post('/:name/', postStopToRoute);

export default router;
