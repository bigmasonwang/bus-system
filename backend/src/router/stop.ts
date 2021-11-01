import express from 'express';
import {
  deleteStop,
  getStopByCode,
  getStops,
  postStop,
} from '../controller/stop';

const router = express.Router();

/** GET all stops */
router.get('/', getStops);

/** GET a stop by code */
router.get('/:code', getStopByCode);

/** POST a stop */
router.post('/', postStop);

/** DELETE a stop */
router.delete('/:code', deleteStop);

export default router;
