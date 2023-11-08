const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens');
const getUserInfo = require('../libs/getUserInfo')
const Token = require('../models/token')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
}) 

userSchema.statics.encryptPassword  = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

userSchema.methods.userExist = async (email) => {
    const result = await mongoose.model('User').findOne({ email })

    return !! result;
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    const same = await bcrypt.compare(password, receivedPassword)
    return same;
}

userSchema.methods.createAccesToken = function () {
    return generateAccessToken(getUserInfo(this))
}

userSchema.methods.refreshToken = async function() {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {

        await new Token({token: refreshToken}).save();
        return refreshToken;

    } catch (error) {
        console.log(error)
    }
}


 
module.exports = mongoose.model('User', userSchema)
