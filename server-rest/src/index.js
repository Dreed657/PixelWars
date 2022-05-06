import ExpressServer from './expressServer.js';
import logger from './logger.js';

const PORT = process.env.PORT ?? 5555;

const launchServer = async () => {
    var server;

    try {
        server = new ExpressServer(PORT);
        server.launch();
    } catch (err) {
        logger.error('Express server failure', err);
        await server.close();
    }
};

launchServer().catch((e) => logger.error(e));
