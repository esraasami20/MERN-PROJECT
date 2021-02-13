const express = require('express');
const auth = require('../middelwares/auth');

const {
    create, login, getAll, editOne,
    pushfollowID, unfollowID, searchUser,
    unfollowes, getById, removeAcc
} = require('../controllers/user');
const router = express();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
//register+ path.extname(file.originalname))
router.post('/', async (req, res, next) => {
    const upload = multer({ storage: storage }).single("photo");
    const { body } = req;
    console.log(body);
    upload(req, res, function (err) {
        console.log(req.user);
        const { body } = req;
        if (req.file != undefined)
            body.photo = req.file.path;

        create({ ...body }).then(blog => res.json(blog)).catch(e => next(e));

    });
    // try {, user: { id }
    //     const user = await create(body);
    //     res.json(user);
    // } catch (e) {
    //     next(e);
    // }
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
        //عايزين نعدل الايديت والبلوج كلها والفوتو والسيرش
    }
});
//user self page /Account/mypage
router.get('/mypage', async (req, res, next) => {
    const { user } = req;
    try {
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//get user by id
router.get('/:username', async (req, res, next) => {
    const { params: { username } } = req;
    try {
        const users = await getById(username);
        res.json(users);
    } catch (e) {
        next(e);
    }
});
router.get('/search/:searched', async (req, res, next) => {
    const { params: { searched } } = req;
    try {
        const results = await searchUser(searched);
        res.json(results);
    } catch (e) {
        next(e);
    }
})

// *************************
router.get('/follow/:fusername', async (req, res, next) => {
    const { user: { username }, params: { fusername } } = req;
    try {
        const userfollowID = await pushfollowID(username, fusername);
        res.json(userfollowID);
    } catch (e) {
        next(e);
    }
})
router.get('/unfollow/:fusername', async (req, res, next) => {
    const { user: { username }, params: { fusername } } = req;
    try {
        // debugger;
        const userfollowID = await unfollowID(username, fusername);
        res.json(userfollowID);
    } catch (e) {
        next(e);
    }
})
//   *****************
// edit it's own data /Account/edit 
router.patch('/edit', async (req, res, next) => {
    const { body, user: { id } } = req;
    try {
        const user = await editOne({ id, body });
        res.json(user);
    } catch (e) {
        next(e);
    }
});
// const { body } = req;
// console.log(body);
// upload(req, res, function (err) {
//     console.log(req.user);
//     const { body } = req;
//     if (req.file != undefined)
//         body.photo = req.file.path;

//     create({ ...body }).then(blog => res.json(blog)).catch(e => next(e));

// });
//follow
// router.post('/follow/:fusername', async (req, res, next) => {
//     const { params: { fusername }, user: { username } } = req;

//     try {

//         const userfollow = await follow(username, fusername);
//         const userfollowes = await followes(username, fusername);
//         res.json({ userfollow, userfollowes });
//     } catch (e) {
//         next(e);
//     }
// });
//unFollowes
// router.post('/unfollow/:fid', async (req, res, next) => {
//     const { params: { fid }, user: { id } } = req;
//     try {

//         const userunfollow = await unfollow(id, fid);
//         const userunfollowes = await unfollowes(id, fid);
//         res.json({ userunfollow, userunfollowes });
//     } catch (e) {
//         next(e);
//     }
// });
//delete user
router.delete('/del', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const users = await removeAcc(id);
        res.json({ 'status': 'deleted' })
    } catch (e) {
        next(e);
    }
});

module.exports = router;
