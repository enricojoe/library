// Import library
const express = require("express");
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const router = require('./src/routers/index.js');
const swagger_options = require('./swagger_option.js');

// konfigurasi app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// konfigurasi swagger
const specs = swaggerJSDoc(swagger_options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(morgan('dev'));
app.use(express.json());
app.use("/", router);

module.exports = app;