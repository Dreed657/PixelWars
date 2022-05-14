class GameService {
    #dataSource;

    constructor() {
        this.dataSource = [];
    }

    getCanvasState(canvasId) {
        let canvasIndex = this.getCanvasIndex(canvasId);

        return this.dataSource[canvasIndex].state;
    }

    getCanvasCellState(canvasId, x, y) {
        let canvasIndex = this.getCanvasIndex(canvasId);

        return {
            x,
            y,
            color: this.dataSource[canvasIndex].state[x][y].color,
        };
    }

    getCanvasIndex(canvasId) {
        if (this.dataSource.length === 0) {
            return -1;
        }

        return this.dataSource.findIndex((c) => c.canvasId === canvasId);
    }

    getActiveCanvasCount() {
        return this.dataSource.length;
    }

    getActiveCanvasIds() {
        return this.dataSource.map((c) => c.canvasId);
    }

    getActiveCanvas() {
        return this.dataSource;
    }

    addCanvas(canvasId, size) {
        if (this.getCanvasIndex(canvasId) != -1) {
            return;
        }

        let state = [];

        for (let x = 0; x <= size; x++) {
            let layer = [];
            for (let y = 0; y <= size; y++) {
                layer[y] = { color: 0 };
            }
            state[x] = layer;
        }

        const newCavans = {
            canvasId,
            state,
        };

        console.log('new canvas added:', newCavans);

        this.dataSource.push(newCavans);
    }

    updateCell(canvasId, x, y, color) {
        let canvasIndex = this.getCanvasIndex(canvasId);

        this.dataSource[canvasIndex].state[x][y] = { color };
    }
}

export default new GameService();
