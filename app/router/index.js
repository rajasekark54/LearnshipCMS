const express = require('express');
const router = express.Router();
const middleWare = require('../middleware')
const User = require('../controller/UserContoller');
const Post = require('../controller/PostController');
const Document = require('../controller/DocumentController');
const Comment = require('../controller/CommentController');

router.get('/', (req, res, next) => {
    res.status(200).json({
        'status': 'Success'
    })
})

function wrapper(fn) {
    return async function (req, res, next) {
        try {
            // middleware 
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

// User Module
router.post('/user', wrapper(async (req, res) => {
    const user = new User();
    const data = await user.create(req);
    res.status(200).json(data);
}));

router.get('/user', wrapper(async (req, res) => {
    const user = new User();
    const data = await user.getAll(req);
    res.status(200).json(data);
}));

router.get('/user/:id', wrapper(async (req, res) => {
    const user = new User();
    const data = await user.find(req.params.id);
    res.status(200).json(data);
}));

router.put('/user', wrapper(async (req, res) => {
    const user = new User();
    const data = await user.update(req, res);
    res.status(200).json(data);
}));

router.delete('/user/:id', wrapper(async (req, res) => {
    const user = new User();
    const data = await user.delete(req.params.id);
    res.status(200).json(data);
}));

// Post Module
router.post('/post', wrapper(async (req, res) => {
    const post = new Post();
    const data = await post.create(req);
    console.log(data);

    res.status(200).json(data);
}));

router.get('/post', wrapper(async (req, res) => {
    const post = new Post();
    const data = await post.getAll(req);
    res.status(200).json(data);
}));

router.get('/post/:id', wrapper(async (req, res) => {
    const post = new Post();
    const data = await post.find(req.params.id);
    res.status(200).json(data);
}));

router.put('/post', wrapper(async (req, res) => {
    const post = new Post();
    const data = await post.update(req, res);
    res.status(200).json(data);
}));

router.delete('/post/:id', wrapper(async (req, res) => {
    const post = new Post();
    const data = await post.delete(req.params.id);
    res.status(200).json(data);
}));

//Document
router.get('/document/:id', wrapper(async (req, res) => {
    const document = new Document();
    const data = await document.find(req.params.id);
    res.status(200).json(data);
}));

router.delete('/document/:id', wrapper(async (req, res) => {
    const document = new Document();
    const data = await document.find(req.params.id);
    res.status(200).json(data);
}));

router.delete('/document/post/:id', wrapper(async (req, res) => {
    const document = new Document();
    const data = await document.deleteByPostId(req.params.id);
    res.status(200).json(data);
}));


//Comment
router.post('/comment', wrapper(async (req, res) => {
    const comment = new Comment();
    const data = await comment.create(req);
    res.status(200).json(data);
}));

router.get('/comment', wrapper(async (req, res) => {
    const comment = new Comment();
    const data = await comment.getAll(req);
    res.status(200).json(data);
}));

router.get('/comment/:id', wrapper(async (req, res) => {
    const comment = new Comment();
    const data = await comment.find(req.params.id);
    res.status(200).json(data);
}));

router.put('/comment', wrapper(async (req, res) => {
    const comment = new Comment();
    const data = await comment.update(req, res);
    res.status(200).json(data);
}));

router.delete('/comment/:id', wrapper(async (req, res) => {
    const comment = new Comment();
    const data = await comment.delete(req.params.id);
    res.status(200).json(data);
}));

module.exports = router;
