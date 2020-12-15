const Model = require('../config/sequelize');
const DocumentController = require('../controller/DocumentController');

class PostContoller {
    async create(req, res) {
        try {
            let post = await Model.Post.create(req.body);

            if (req.files) {
                let document = new DocumentController();
                post.dataValues.document = await document.uploadDocument(req, post.id);
            }
            return post;
        } catch (err) {
            throw err;
        }
    }

    async getAll(req, res) {
        try {
            const post = await Model.Post.findAll({
                attributes: { exclude: ['password'] }
            });
            return post;
        } catch (e) {
            throw e
        }
    }

    async find(id) {
        try {
            const post = await Model.Post.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    id: id
                }
            });
            return post;
        } catch (e) {
            throw e
        }
    }

    async update(req, res) {
        try {
            const post = await Model.Post.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (req.file) {
                let document = new DocumentController();
                post['document'] = document.uploadDocument(req, post.id);
            }

            return post;
        } catch (e) {
            throw e
        }
    }

    async delete(id) {
        try {
            const post = await Model.Post.destroy({
                where: {
                    id: id
                }
            });
            return post;
        } catch (e) {
            throw e
        }
    }
}

module.exports = PostContoller;