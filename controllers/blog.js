const Blog = require('../models/blog');

const create = (blog) => Blog.create(blog);
const getAll = (query) => Blog.find(query).exec();
const gets = (query) => Blog.find(query).exec();
const getById = (id) => Blog.findById(id).exec();
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
const deletee = (id) => Blog.findByIdAndDelete(id).exec();
const deleteAll =(username)=>Blog.deleteMany({username:username})
// const getByTitle = ({ title }) => Blog.find({ title }).exec();
// const getByTag = ({ tags }) => Blog.find({ tags }).exec();
const getByAuther = ({ username }) => Blog.find({ username }).exec();
const getNew = (query) => Blog.find(query).sort([['createdAT', -1]]).exec();
const pushComment = ({ id, Comment })=>Blog.findByIdAndUpdate(
    id,
    {
                $push: {
                    comments: Comment,
                }
            }
, { new: true }).exec();
const getmyFblog = (following) =>
    Blog.find({ username: { $in: following } }).sort({createdAt:'desc'});

const searchBlog = async (searched) => {
    if (!searched) {// return blogs of user who he is following
        const blogs = {};
        return blogs;
    }
    else {
        const blogs = await Blog.find({
            $or: [{ tags: new RegExp(searched, 'i') },
            { title: new RegExp(searched, 'i') },
            { username: new RegExp(searched, 'i') }]
        }).exec();
        return blogs;
    }
}

module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deletee,
    // getByTitle,
    // getByTag,
    getByAuther,
    getNew,pushComment,
    gets,deleteAll,
    getmyFblog,
    searchBlog
};
