const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {type:String,required:true,unique: true},
    password: { type: String,required:true, required: true }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;