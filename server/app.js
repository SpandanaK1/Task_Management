const config = require("../config");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
// const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const helmet = require('helmet');
const formData = require('express-form-data');

const app = express();

// const { middlewares } = require('@blkbrd01/cb-frs-blackbird-util'); // Un-commenting the following three lines on JPMC
const { middlewares } = require('./cb-frs-blackbird-util'); // Remove in JPMC

const routes = require('./routes/v1/index');

let uploadPath = config.upload_files;

app.use(express.static(uploadPath.substring(0, uploadPath.length - 1)));

let options =
{
    uploadDir: uploadPath
};
app.use(formData.parse(options));
app.use((err, req, res, next) =>
{
    res.json({
        status: 0,
        message: err.message
    });
});

//attach middlewares
app.use(middlewares.logRequest());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(formData.parse());
app.use(cors());
app.use(helmet());

//app.use(requestBodyMiddleware);
app.use(cors());
app.use(helmet());

//app.use(authenticateMiddleware);
app.use(formData.parse());

//attach routes
app.use('/', routes);

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(apiDocument));

// error middlewares
// app.use(errorMiddleware);

module.exports = app;