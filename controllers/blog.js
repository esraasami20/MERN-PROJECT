const Blog = require('../models/blog');

const create = (blog) => Blog.create(blog);
const getAll = (query) => Blog.find(query).exec();
const gets = (query) => Blog.find(query).exec();
const getById = (id) => Blog.findById(id).exec();
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
const deletee = (id) => Blog.findByIdAndRemove(id).exec();
const getByTitle = ({ title }) => Blog.find({ title }).exec();
const getByTag = ({ tags }) => Blog.find({ tags }).exec();
const getByAuther = ({ auther }) => Blog.find({ auther }).exec();
const getNew = (query) => Blog.find(query).sort([['createdAT', -1]]).exec();

module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deletee,
    getByTitle,
    getByTag,
    getByAuther,
    getNew,
    gets
};
