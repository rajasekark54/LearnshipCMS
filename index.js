const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty')
const logger = require('./app/utill/logger');
require('dotenv').config();

console.log('Step 1');
const see = require('./app/config/sequelize')
console.log('Step 2');

const router = require('./app/router');


const port = 3000;
app.use(bodyParser.json());
app.use(multipart());
app.use(router);

app.use((err, req, res, next) => {
    logger.error(err);
    console.log(err);
    return res.status(500).json({
        name: err.name,
        status: 'Error',
        statusCode: err.statusCode,
        message: err.message
    })
})

console.log('listen');
app.listen(port, (err) => {
    if (err) logger.error('Error Application');
    logger.info(`Application Listening Port ${port}`);
});