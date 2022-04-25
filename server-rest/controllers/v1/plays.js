import express from 'express';

import PlaysService from '../../services/plays.js';

let router = express.Router();

router.get('/', async (req, res) => {
    const data = await PlaysService.getAll();

    return res.status(200).json(data);
});

router.post('/', async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = await PlaysService.save(body);

    return res.status(200).json(data);
});

export default router;
