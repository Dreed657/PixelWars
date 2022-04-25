import cors from 'cors';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import mainRouter from './controllers/index.js';
import logger from './logger.js';

export default class ExpressServer {
    constructor(port) {
        this.port = port;
        this.app = express();

        this.setupMiddleware();
    }

    setupMiddleware() {
        this.app.use(morgan('dev', { stream: logger.stream }));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(mainRouter);
    }

    launch() {
        http.createServer(this.app).listen(this.port);
        logger.info(`Listening on port ${this.port}`);
    }

    async close() {
        if (this.app !== undefined) {
            await this.app.close();
            logger.log(`Server on port ${this.port} shut down`);
        }
    }
}
