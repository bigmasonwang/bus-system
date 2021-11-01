import express from 'express';
import { getBuses, postBus, deleteBusById } from '../controller/bus';

const router = express.Router();

/** GET all buses */
router.get('/', getBuses);

/** POST a bus */
router.post('/', postBus);

/** DELETE a bus */
router.delete('/:registration', deleteBusById);
export default router;
