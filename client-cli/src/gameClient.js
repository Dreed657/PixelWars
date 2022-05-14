export class GameClient {
    isSetuped = false;

    ref = '';
    size = 0;
    canvas = [];
    canvasId = 0;
    clientId = '';

    constructor(ref, canvasId) {
        this.ref = ref;
        this.canvasId = canvasId;

        console.log(`New client`, { ref, canvasId });
    }

    setup(size, canvas, clientId) {
        this.size = size;
        this.canvas = canvas;
        this.clientId = clientId;
        this.isSetuped = true;

        console.log('init', {
            ref: this.ref,
            size: this.size,
            clinetId: this.clientId,
            canvasId: this.canvasId,
            canvas: this.canvas,
        });
    }

    updateCell(x, y, color) {
        if (!this.isSetuped) {
            return;
        }

        this.canvas[x][y] = {
            color,
        };
    }
}
