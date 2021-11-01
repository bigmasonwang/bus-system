import express from 'express';
import {
  deleteLine,
  getLineByName,
  getLines,
  postLine,
  postRoutesToLine,
} from '../controller/line';

const router = express.Router();

/** GET all lines */
router.get('/', getLines);

/** GET a line by lineName */
router.get('/:lineName', getLineByName);

/** POST a line */
router.post('/', postLine);

router.post('/:lineName', postRoutesToLine);

/** DELETE a line */
router.delete('/:lineName', deleteLine);

export default router;
