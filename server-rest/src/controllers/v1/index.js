import express from 'express';
import canvas from './canvas.js';
import snapshots from './snapshots.js';
import plays from './plays.js';
import stats from './stats.js';

let router = express.Router();

router.use('/canvas', canvas);
router.use('/snapshots', snapshots);
router.use('/plays', plays);
router.use('/stats', stats);

export default router;
