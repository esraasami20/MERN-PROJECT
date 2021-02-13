const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    Fname: {
        type: String,
        maxLength: 160,
        required: true,
    },
    Lname: {
        type: String,
        maxLength: 160,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type:String,
        default:"static\\17458029_136875910174428_2203645482173159046_n.jpg-1612814517314.jpg"
        // ../static/0.jpeg-1612824564179.jpeg
    },
    dob: Date,
    following: [{
        type: String
        // ref: 'User'
    }],
    followers: [{
        type:String 
        // ref: 'User'
    }],
    // mongoose.Schema.Types.ObjectId
},
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },


    });
Schema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});
Schema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        next();
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});
Schema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const usermodel = mongoose.model('User', Schema);

module.exports = usermodel;