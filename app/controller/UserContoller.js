const Model = require('../config/sequelize');

class UserContoller {
    async create(req, res) {
        try {
            const user = Model.User.create(req.body);
            return user;
        } catch (err) {
            throw err;
        }
    }

    async getAll(req, res) {
        try {
            const user = await Model.User.findAll({
                attributes: { exclude: ['password'] }
            });
            return user;
        } catch (e) {
            throw e
        }
    }

    async find(id) {
        try {
            const user = await Model.User.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    id: id
                }
            });
            return user;
        } catch (e) {
            throw e
        }
    }

    async update(req, res) {
        try {
            const user = await Model.User.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            return user;
        } catch (e) {
            throw e
        }
    }

    async delete(id) {
        try {
            const user = await Model.User.destroy({
                where: {
                    id: id
                }
            });
            return user;
        } catch (e) {
            throw e
        }
    }
}

module.exports = UserContoller;