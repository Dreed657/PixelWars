import express from 'express';

import SnapshotsService from '../../services/snapshots.js';

let router = express.Router();

router.get('/', async (req, res) => {
    const data = await SnapshotsService.getAll();

    return res.status(200).json({
        items: data.length,
        data,
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    const data = await SnapshotsService.getById(id);

    if (data === null) {
        return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({
        data,
    });
});

router.post('/', async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = await SnapshotsService.create(body);

    return res.status(200).json(data);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = await SnapshotsService.update(id, body);

    if (data === null) {
        return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json(data);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    const data = await SnapshotsService.delete(id);

    if (data === null) {
        return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json(data);
});

export default router;
