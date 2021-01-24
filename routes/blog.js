const express = require('express');
const {
    create, getAll, getById, editOne, deletee, getByTitle, getByTag, getByAuther, getNew,gets

} = require('../controllers/blog');
const authMiddleware = require('../middelwares/auth');
const router = express();

//get all data
router.get('/', async (req, res, next) => {

    try {
        const blogs = await getAll();
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get newly blogs
router.get('/new', async (req, res, next) => {

    try {
        const blog = await getNew();
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
router.use(authMiddleware);
//get my blogs
router.get('/myblogs', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const blog = await gets({ auther: id });
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
//get data by id
router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blogs = await getById(id);
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get data bt title
router.get('/title/:title', async (req, res, next) => {
    const { params: { title } } = req;
    try {
        const blogs = await getByTitle({ title });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get by auther
router.get('/auther/:auther', async (req, res, next) => {
    const { params: { auther } } = req;
    try {
        const blogs = await getByAuther({ auther });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get data by tag
router.get('/tags/:tags', async (req, res, next) => {
    const { params: { tags } } = req;
    try {
        const blogs = await getByTag({ tags });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//edit data
router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;

    try {
        const blogs = await editOne(id, body, { new: true });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
router.post('/', async (req, res, next) => {
    const { body, user: { _id } } = req;

    try {
        const blog = await create({ ...body, auther: _id });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});
//delete
router.delete('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blogs = await deletee(id);
        res.send("^-^ Object Deleted ^-^");
    } catch (e) {
        next(e);
    }
});
//get by id
router.get('/', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const blog = await gets({ autherId: id });
        res.json(blog);

    } catch (e) {
        next(e);

    }
});

module.exports = router;
