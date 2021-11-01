import express from 'express';
import { getBuses, postBus, deleteBus, postLineToBus, getBus } from '../controller/bus';

const router = express.Router();

/** GET all buses */
router.get('/', getBuses);

/** GET a buses by registration*/
router.get('/:registration', getBus);

/** POST a bus */
router.post('/', postBus);

/** POST a schedule line to bus */
router.post('/:registration', postLineToBus)

/** DELETE a bus */
router.delete('/:registration', deleteBus);
export default router;
