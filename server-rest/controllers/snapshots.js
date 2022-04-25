import express from 'express';

import SnapshotsService from '../services/snapshots.js';

let router = express.Router();

router.get('/', (req, res) => {
    const data = SnapshotsService.getAll();

    return res.status(200).json({
        size: data.length,
        data,
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    const data = SnapshotsService.getById(id);

    return res.status(200).json({
        data,
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = SnapshotsService.create(body);

    return res.status(200).json({
        data,
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = SnapshotsService.update(id, body);

    return res.status(200).json({
        data,
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    const data = SnapshotsService.delete(id);

    return res.status(200).json({
        data,
    });
});

export default router;
