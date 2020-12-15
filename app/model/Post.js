const { Model } = require('sequelize');

class Post extends Model {
    static init(sequelize, dataType) {
        return super.init(
            {
                id: { type: dataType.INTEGER, autoIncrement: true, primaryKey: true },
                heading: { type: dataType.STRING },
                content: { type: dataType.TEXT },
            },
            {
                tabelName: 'post',
                modelName: 'Post',
                sequelize,
            }
        )
    }

    static associate(model) {
        this.hasMany(model.Comment, {
            foreignKey: 'postId'
        }),
            this.hasMany(model.Document, {
                foreignKey: 'postId'
            })
    }
}

module.exports = Post;