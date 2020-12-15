const { Model } = require('sequelize');

class Comment extends Model {
    static init(sequelize, dataType) {
        return super.init(
            {
                id: { type: dataType.INTEGER, autoIncrement: true, primaryKey: true },
                message: { type: dataType.TEXT },
                replyCommentId: { type: dataType.STRING },
            },
            {
                tabelName: 'comment',
                modelName: 'Comment',
                sequelize,
            }
        )
    }
}

module.exports = Comment;