const mongoose = require("mongoose");

const scoreCardSchema = mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    answerSheet: {
        type: Array,
        default: null,
    },
    totalCorrect: {
        type: Number,
        default: null,
    },
    totalIncorrect: {
        type: Number,
        default: null
    },
    totalMarks: {
        type: Number,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

const scoreCardModel = mongoose.model("scoreCard", scoreCardSchema);
module.exports = scoreCardModel;