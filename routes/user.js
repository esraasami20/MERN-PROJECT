const express = require('express');
const auth = require('../middelwares/auth');

const {
    create, login, getAll, editOne, follow,
    followes,
    unfollow,
    unfollowes, getById,removeAcc
} = require('../controllers/user');
const router = express();
//register
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//login
router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.use(auth);
//get all data
router.get('/', async (req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//get user by id
router.get('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const users = await getById(id, body);
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//edit data
router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const users = await editOne(id, body);
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//follow
router.post('/follow/:fid', async (req, res, next) => {
    const { params: { fid }, user: { id } } = req;

    try {

        const userfollow = await follow(id, fid);
        const userfollowes = await followes(id, fid);
        res.json({ userfollow, userfollowes });
    } catch (e) {
        next(e);
    }
});
//unFollowes
router.post('/unfollow/:fid', async (req, res, next) => {
    const { params: { fid }, user: { id } } = req;
    try {

        const userunfollow = await unfollow(id, fid);
        const userunfollowes = await unfollowes(id, fid);
        res.json({ userunfollow, userunfollowes });
    } catch (e) {
        next(e);
    }
});
//delete user
router.delete('/del', async (req, res, next) => {
    const { user: { id } } = req;
    try {
      const users = await removeAcc(id);
      res.send("^_^ User Deleted ^_^ ");
    } catch (e) {
      next(e);
    }
  }); 

module.exports = router;
