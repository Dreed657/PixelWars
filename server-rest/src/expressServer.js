import cors from 'cors';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import v1Router from './controllers/v1/index.js';
import logger from './logger.js';

export default class ExpressServer {
    constructor(port) {
        this.port = port;
        this.app = express();

        this.setupMiddleware();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(morgan('dev', { stream: logger.stream }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/v1', v1Router);

        this.app.get('/api-doc/api.json', (req, res) => {
            return res
                .status(200)
                .json(JSON.parse(fs.readFileSync('./api.json')));
        });

        try {
            this.app.use(
                '/api-doc',
                swaggerUi.serve,
                swaggerUi.setup(JSON.parse(fs.readFileSync('./src/api.json')))
            );
        } catch (e) {
            logger.error('Feiled to load openapi file.'.e.message);
        }
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
