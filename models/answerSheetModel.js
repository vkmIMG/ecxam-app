const mongoose = require("mongoose");

const answersheetSchema = mongoose.Schema({
    examId: {
        type:  mongoose.Schema.Types.ObjectId,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    qn:{
        type:Number,
        default:null,
    },
    answerSelected: {
        type: String,
        default: null,
    },
    optionNo:{
        type:String,
        default:null,
    },
    answerStatus: {
        type: String,
        default: null,
    },
    isCorrect: {
        type: Boolean,
        default: null,
    },
    correctAnswer:{
        type:String,
        default:null
    }
},{
    timestamps: true,
    versionKey: false
});

let answersheetModel = mongoose.model("answersheet", answersheetSchema);
module.exports = answersheetModel;