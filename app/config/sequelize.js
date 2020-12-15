const Sequelize = require('sequelize');
const logger = require('../utill/logger');
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const Document = require('../model/Document');

const dbConnection = () => {
    try {
        const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: false
        })

        connection.authenticate().then(() => {
            logger.info('DB Connection Established');
        });

        return connection;
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

const modelConnection = () => {
    try {
        console.log('modelConnection');
        const sequelize = dbConnection();
        const modelList = {
            User: User.init(sequelize, Sequelize),
            Post: Post.init(sequelize, Sequelize),
            Comment: Comment.init(sequelize, Sequelize),
            Document: Document.init(sequelize, Sequelize)
        }

        Object.values(modelList).filter(model => {
            return typeof model.associate === 'function'
        }).filter(model => model.associate(modelList))

        sequelize.sync().then(() => {
            logger.info('DB sync Done');
        });

        const model = {
            ...modelList,
            sequelize
        }
        if (sequelize) {
            console.log('sequelize');
        }
        return model;
    } catch (err) {
        throw err
    }
}
module.exports = modelConnection();
// global.sequelize = modelConnection();