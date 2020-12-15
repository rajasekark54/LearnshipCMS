const Model = require('../config/sequelize');
const s3Client = require('../config/s3');

class DocumentController {
    async uploadDocument(req, id) {
        try {
            let document = [];

            for (let i = 0; i < req.body.documentCount; i++) {
                let fileName = `doc${i}`;

                if (req.files[fileName]) {
                    let file = req.files[fileName];

                    const params = {
                        Bucket: process.env.AWS_S3_BUCKETNAME,
                        Key: file.originalname, // pass key
                        Body: file.bufferll, // pass file body
                    };

                    await s3Client.upload(params, (err, data) => {
                        if (err) {
                            throw err;
                        }

                        document.push({
                            location: data.Location,
                            fileName: file.originalname,
                            postId: id
                        });
                    });
                }
            }

            if (document.length) {
                return this.bulkCreate(document);
            }
            return [];
        } catch (e) {
            throw e
        }
    }

    async find(id) {
        try {
            const document = await Model.Document.findAll({
                where: {
                    id: id
                }
            });
            return document;
        } catch (e) {
            throw e
        }
    }

    async bulkCreate(document) {
        try {
            return await Model.Document.bulkCreate(document)
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        try {
            let document = await Model.Document.destroy({
                id: id
            })

            return {
                message: `Document ${id} - deleted successfulle`
            }
        } catch (err) {
            throw err;
        }
    }

    async deleteByPostId(id) {
        try {
            let document = await Model.Document.destroy({
                postId: id
            })

            return {
                message: `Documents against post-id ${id} deleted successfulle`
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DocumentController;