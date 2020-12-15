const Model = require('../config/sequelize');

class CommentContoller {
    async create(req, res) {
        try {
            const comment = Model.Comment.create(req.body);
            return comment;
        } catch (err) {
            throw err;
        }
    }

    async getAll(req, res) {
        try {
            const comment = await Model.Comment.findAll();
            return comment;
        } catch (e) {
            throw e
        }
    }

    async find(id) {
        try {
            const comment = await Model.Comment.findAll({
                where: {
                    id: id
                }
            });
            return comment;
        } catch (e) {
            throw e
        }
    }

    async update(req, res) {
        try {
            const comment = await Model.Comment.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            return comment;
        } catch (e) {
            throw e
        }
    }

    async delete(id) {
        try {
            const comment = await Model.Comment.destroy({
                where: {
                    id: id
                }
            });
            return comment;
        } catch (e) {
            throw e
        }
    }
}

module.exports = CommentContoller;