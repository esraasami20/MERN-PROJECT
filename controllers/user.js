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
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '2d' });
    return { ...user.toJSON(), token };
};
//follow function
// const follow = (username, targetusername) => User.update(
//     {
//         "username": username
//     },
//     {
//         $push: {
//             following: targetusername,
//         }
//     }

// );
// //followes
// const followes = (username, targetusername) => User.update(
//     { "username": targetusername },
//     {
//         $push: {
//             followers: username,
//         }
//     }
// );
// //unfollow function
// const unfollow = (username, targetusername) => User.update(
//     { "username": username },
//     {
//         $pull: {
//             following: targetusername,
//         }
//     }
// );
// //unfollowes
// const unfollowes = (username, targetusername) => User.update(
//     { "username": targetusername },
//     {
//         $pull: {
//             followers: username,
//         }
//     }
// );
//search for user
const searchUser = async(searched) => {
    const users = await User.find({ username: new RegExp(searched, 'i') }).exec();
    return users;
};

const getAll = () => User.find({}).exec();
const editOne = ({ id, body }) => User.findByIdAndUpdate(id, body, { new: true }).exec();

// const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
const getById = (username) => User.findOne({username:username}).exec();
const removeAcc = (id) =>  User.findByIdAndDelete(id).exec();

// && !loggedUser.followers.find(item => item == targetusername)
const pushfollowID = async(username, targetusername)=>{
    const loggedUser = await User.findOne({username:username}).exec();
    
    if (targetusername != username && !loggedUser.following.find(item => item == targetusername )){
        User.updateOne({username:username },{ $push : {following: targetusername } } ,{new:true}).exec();
        User.updateOne({username:targetusername}, { $push: { followers: username } }, { new: true }).exec();
        return {"status":"followed"}
    } else {
        return {"status":"can't follow"}
    }
}
const unfollowID = (username, targetusername)=>{
User.updateOne({username:username },{ $pull : {following: targetusername } } ,{new:true}).exec();
User.updateOne({username:targetusername}, { $pull: { followers: username } }, { new: true }).exec();
    return {"status":"unfollowed"}
}

module.exports = {
    create,unfollowID,
    login,
    getAll,
    editOne,
    // follow,
    // followes,
    // unfollow,
    // unfollowes,
    getById,
    removeAcc,
    pushfollowID,
    searchUser

};
// let flag = "";
//     if (index === -1)
//     {
//         followers.push(f_id);
//         flag = "Now you Follow " + isExistF_ID.username;
//     } else {
//         followers.splice(index, 1);
//         flag = "Now you stop Following " + isExistF_ID.username;
//     }
    
//     const user = await User.findOneAndUpdate({ _id: id }, { followers: followers }, { new: true }).exec();
//     return {...user, flag: flag};