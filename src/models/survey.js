const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    id: {
        type: String,
    },
    idUser: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    questions: {
        type: [],
        required: true,
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Survey', surveySchema);