<<<<<<< HEAD
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const sign = require('../auth/generateToken');
=======
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens');
const getUserInfo = require('../libs/getUserInfo')
const Token = require('../models/token')
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979

const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
    username: {
=======
    name: {
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
<<<<<<< HEAD
        type: String,
        required: true
    },
    surveys: [{
        ref: 'Survey',
        type: Schema.Types.ObjectId,
    }],
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
}
)

userSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.userExist = async function (email) {
    const result = await mongoose.model('User').findOne({ email });
    return !!result;
}

userSchema.statics.comparePassword = async function (password, receivedPassword) {
    const same = await bcrypt.compare(password, receivedPassword);
    return !!same;
}


module.exports = mongoose.model('User', userSchema);
=======
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
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
