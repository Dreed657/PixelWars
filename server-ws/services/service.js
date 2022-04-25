class GameService {
    canvas = [];

    constructor(size) {
        for (let i = 0; i <= size; i++) {
            let tmp = [];
            for (let z = 0; z <= size; z++) {
                tmp.push({
                    x: i,
                    y: z,
                    color: 0,
                });
            }
            this.canvas.push(tmp);
        }
    }

    draw() {
        console.log('Initial : ', this.canvas);
    }

    updateCell(x, y, color) {
        this.canvas[x][y] = { x, y, color };
    }
}

export default GameService;
