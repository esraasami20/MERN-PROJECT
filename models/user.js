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
    following: [{ 
        type:mongoose.Schema.ObjectId,
         ref: 'User' 
    }],
    followers: [{ 
        type:mongoose.Schema.ObjectId,
         ref: 'User'
     }],
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
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});
Schema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const usermodel = mongoose.model('User', Schema);

module.exports = usermodel;