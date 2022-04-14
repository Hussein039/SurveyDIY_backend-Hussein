let mongoose = require('mongoose');

// Create a model class
let responseModel = mongoose.Schema(
    {
        surveyId: String,
        username: String,
        responses: [
            {
                questionId: Number,
                questionText: String,
                answer: String
            }
        ],
        responseDate: Date
    },
    {
        collection: "response"
    }
);

module.exports = mongoose.model('response', responseModel);