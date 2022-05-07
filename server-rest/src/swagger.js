import swaggerAutogen from 'swagger-autogen';

const description = {
    info: {
        title: 'PixelWars Rest Api',
        description: 'A description for your cool API',
    },
    host: `${process.env.ADDRESS ?? 'localhost'}:${process.env.PORT ?? 5555}`,
    schemes: ['http'],
    basePath: '/v1',
};

const outputFile = './api.json';
const endpointsFiles = ['./controllers/v1/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, description);
