/* eslint-disable no-console */
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Layanan Cerdas',
    description:
      'API layanan cerdas',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'irvantaufik28@gmail.com',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  }

};

const outputFile = './docs/docs.json';
const endpointsFiles = [
  './routes/authRouter.js',
  './routes/otpRouter.js',
  './routes/productRouter.js',
  './routes/userRouter.js',

];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});