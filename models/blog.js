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
    photo: {
        type:String,
        // default:"static\\FB_IMG_1585154892010.jpg-1612892452861.jpg"
        // ../static/0.jpeg-1612824564179.jpeg
    },
    auther: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        maxLength: 256,
        required: true
    },
    name: {
        type: String,
        maxLength: 256,
        required: true
    },
    comments: [{
        body: String,
        dop: {
            type: Date,
            default: new Date()
        },
        commenterName:String,
        commenter: String
    }],


});
const blogmodel = mongoose.model('blog', blogschema);

module.exports = blogmodel;