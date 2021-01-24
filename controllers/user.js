const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// const { db } = require('../models/user');

const asyncSign = promisify(jwt.sign);

const User = require('../models/user');

const create = (user) => User.create(user);

//login
const login = async ({ username, password }) => {
    //   get user from db
    const user = await User.findOne({ username }).exec();
    if (!user) {
        throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) {
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return { ...user.toJSON(), token };
};
//follow function
const follow = (id, trgetid) => User.update(
    {
        "_id": id
    },
    {
        $push: {
            following: trgetid,
        }
    }

);
//followes
const followes = (id, trgetid) => User.update(
    { "_id": trgetid },
    {
        $push: {
            followers: id,
        }
    }
);
//unfollow function
const unfollow = (id, trgetid) => User.update(
    { "_id": id },
    {
        $pull: {
            following: trgetid,
        }
    }
);
//unfollowes
const unfollowes = (id, trgetid) => User.update(
    { "_id": trgetid },
    {
        $pull: {
            followers: id,
        }
    }
);

const getAll = () => User.find({}).exec();

const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
const getById = (id) => User.findById(id).exec();
const removeAcc = (id) =>  User.findByIdAndDelete(id).exec();

module.exports = {
    create,
    login,
    getAll,
    editOne,
    follow,
    followes,
    unfollow,
    unfollowes,
    getById,
    removeAcc

};
