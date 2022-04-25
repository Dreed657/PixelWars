import express from 'express';

import CanvasService from '../services/canvas.js';

let router = express.Router();

router.get('/', (req, res) => {
    const data = CanvasService.getAll();

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

    const data = CanvasService.getById(id);

    return res.status(200).json({
        data,
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({ message: 'No payload!' });
    }

    const data = CanvasService.create(body);

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

    const data = CanvasService.update(id, body);

    return res.status(200).json({
        data,
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: 'Not found' });
    }

    const data = CanvasService.delete(id);

    return res.status(200).json({
        data,
    });
});

export default router;
