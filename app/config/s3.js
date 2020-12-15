const AWS = require('aws-sdk');
const logger = require('../utill/logger');

function s3() {
    try {
        const s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        logger.info('S3 configuration established');
        return s3bucket;
    } catch (err) {
        throw err;
    }
}

module.exports = s3();