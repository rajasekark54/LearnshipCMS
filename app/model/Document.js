const { Model } = require('sequelize');

class Document extends Model {
    static init(sequelize, dataType) {
        return super.init(
            {
                id: { type: dataType.INTEGER, autoIncrement: true, primaryKey: true },
                location: { type: dataType.TEXT },
            },
            {
                tabelName: 'document',
                modelName: 'Document',
                sequelize,
            }
        )
    }
}

module.exports = Document;