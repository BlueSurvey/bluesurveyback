<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveySchema = Schema({

=======
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    id: {
        type: String,
    },
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
    idUser: {
        type: String,
        required: true
    },
<<<<<<< HEAD

    title: {
        type: String,
        required: true,
=======
    title: {
        type: String,
        required: true
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
    },

    description: {
        type: String,
<<<<<<< HEAD
        required: true,
    },

    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]

})
=======
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
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979

module.exports = mongoose.model('Survey', surveySchema);