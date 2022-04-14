let mongoose = require('mongoose');

// Create a model class
let surveyModel = mongoose.Schema(
    {
        title: String,
        template: String,
        questions: [
            {
                questionId: Number,
                questionText: String,
                questionOptionText: String
            }
        ],
        startDate: Date,
        endDate: Date,
        userId: String,
        publish: Boolean
    },
    {
        collection: "survey"
    },
    {
        //createdAt, updatedAt
        timestamps: true 
    }
);

module.exports = mongoose.model('survey', surveyModel);