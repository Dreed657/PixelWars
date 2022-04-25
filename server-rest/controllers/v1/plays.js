import express from 'express';

import PlaysService from '../../services/plays.js';

let router = express.Router();

router.post('/', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = PlaysService.save(body);

    return res.status(200).json({
        data,
    });
});

export default router;
