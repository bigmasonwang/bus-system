import express from 'express';
import { getBuses, postBus, deleteBus } from '../controller/bus';

const router = express.Router();

/** GET all buses */
router.get('/', getBuses);

/** POST a bus */
router.post('/', postBus);

/** DELETE a bus */
router.delete('/:registration', deleteBus);
export default router;
