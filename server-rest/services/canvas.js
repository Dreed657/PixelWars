const data = [];

class CanvasService {
    getAll() {
        return data;
    }

    getById(id) {
        return data.find((c) => c.id == id);
    }

    create(canvas) {
        data.push(canvas);

        return canvas;
    }

    update(id, canvas) {
        let index = data.findIndex((c) => c.id == id);
        data[index] = canvas;

        return canvas;
    }

    delete(id) {
        let index = data.findIndex((c) => c.id == id);
        let canvas = data[index];
        data.splice(index, 1);

        return canvas;
    }
}

export default new CanvasService();
