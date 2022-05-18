const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    examId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    qn:{
        type:Number,
        default:null, 
    },
    question: {
        type: String,
        default: null,
    },
    optionA: {
        type: String,
        default: null,
    },
    optionB: {
        type: String,
        default: null,
    },
    optionC: {
        type: String,
        default: null,
    },
    optionD: {
        type: String,
        default: null,
    },
    answer: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;