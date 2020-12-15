const { Model } = require('sequelize');

class User extends Model {
    static init(sequelize, dataType) {
        return super.init(
            {
                id: { type: dataType.INTEGER, autoIncrement: true, primaryKey: true },
                userName: { type: dataType.STRING },
                firstName: { type: dataType.STRING },
                lastName: { type: dataType.STRING },
                password: { type: dataType.STRING },
            },
            {
                tabelName: 'user',
                modelName: 'User',
                sequelize,
            }
        )
    }

    static associate(model) {
        this.hasMany(model.Post, {
            foreignKey: 'userId'
        })
    }
}

module.exports = User;