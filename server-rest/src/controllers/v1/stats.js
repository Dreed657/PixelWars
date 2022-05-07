import express from 'express';

import StatsService from '../../services/stats.js';

let router = express.Router();

router.get('/totals', async (req, res) => {
    const data = await StatsService.getTotals();

    return res.status(200).json(data);
});

router.get('/playsByHour', async (req, res) => {
    const data = await StatsService.getPlaysByHour();

    return res.status(200).json(data);
});

router.get('/snaphotsByHour', async (req, res) => {
    const data = await StatsService.getSnapshotsByHour();

    return res.status(200).json(data);
});

router.get('/playsPerCanvas', async (req, res) => {
    const data = await StatsService.getPlaysPerCanvas();

    return res.status(200).json(data);
});

router.get('/playsPerClient', async (req, res) => {
    const data = await StatsService.getPlaysPerClient();

    return res.status(200).json(data);
});

export default router;
