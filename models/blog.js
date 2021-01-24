const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: [String],
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt: Date,
    photo: String,
    auther: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },

});
const blogmodel = mongoose.model('blog', blogschema);

module.exports = blogmodel;