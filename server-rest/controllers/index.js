import express from 'express';
import canvasRouter from './canvas.js';
import snapshotsRouter from './snapshots.js';
import playsRouter from './plays.js';

let router = express.Router();

router.use('/canvas', canvasRouter);
router.use('/snapshots', snapshotsRouter);
router.use('/plays', playsRouter);

export default router;
