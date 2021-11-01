import express from 'express';
import { deleteStop, getStops, postStop } from '../controller/stop';

const router = express.Router();

/** GET all stops */
router.get('/', getStops);

/** POST a stop */
router.post('/', postStop);

/** DELETE a stop */
router.delete('/:code', deleteStop);

export default router;
