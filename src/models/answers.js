const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answers: {
        type: Object,
        required: true
    },
    surveyId: String
})

answerSchema.statics.countSameOption = async function(surveyId) {
    const agregationResult = await this.aggregate([
        { $match: { surveyId } },
        { $group: {}  }
    ])

    return agregationResult;
}


module.exports = mongoose.model('Answers', answerSchema)