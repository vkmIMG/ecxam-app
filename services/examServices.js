//model ........
const questionModel = require("../models/questionModel");
const answersheetModel = require("../models/answerSheetModel");
const scoreCardModel = require("../models/scoreCardModel");
const mongoose = require("mongoose");

class examServices {
    constructor() {
        return {
            addQuestion: this.addQuestion.bind(this),
            getQuestions: this.getQuestions.bind(this),
            saveAnswer: this.saveAnswer.bind(this),
            getQuestionDetails: this.getQuestionDetails.bind(this),
            reviewAnswerSheet: this.reviewAnswerSheet.bind(this),
            finalSumit: this.finalSumit.bind(this),
            scoreCard: this.scoreCard.bind(this),
        }
    }

    // addQuestion ................................
    async addQuestion(req) {
        try {
            let { question, optionA, optionB, optionC, optionD, answer } = req.body;
            let data = new questionModel({ question, optionA, optionB, optionC, optionD, answer });
            let dataSave = await data.save();
            if (dataSave && dataSave !== {}) {
                return {
                    message: "Question Save Successfully",
                    status: true,
                    data: dataSave
                }
            }
            return {
                message: "Question Save Failed",
                status: false,
                data: {}
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    //get question............................
    async getQuestions() {
        try {
            let data = await questionModel.find({}, { answer: 0, createdAt: 0, updatedAt: 0 }).sort({ "qn": 1 });
            if (data && Array.isArray(data) && data.length > 0) {
                return {
                    message: "questions get successfully",
                    status: true,
                    data: data
                }
            } else {
                return {
                    message: "No question found ",
                    status: false,
                    data: {}
                }
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    //saveanswer ............................
    async saveAnswer(req) {
        try {
            let { id: userId } = req.user;
            let { examId, answerSelected, answerStatus, questionId, optionNo } = req.body;
            if (mongoose.Types.ObjectId.isValid(questionId) && questionId && (mongoose.Types.ObjectId.isValid(examId) || examId == null)) {
                if (typeof (answerSelected) && typeof (answerStatus) && typeof (optionNo) == 'string' || null) {
                    // find answer of question .
                    var correctAnswer = await questionModel.findOne({ _id: questionId }, { answer: 1, qn: 1 });
                    var isCorrect;
                    if (answerSelected) {
                        if (correctAnswer.answer === answerSelected) {
                            isCorrect = true;
                        } else {
                            isCorrect = false;
                        };
                    } else {
                        isCorrect = null;
                    };
                    //checking question already save ?
                    let isSubmitted = await answersheetModel.findOne({ examId, questionId, userId });
                    if (isSubmitted && isSubmitted !== {}) {
                        let data = await answersheetModel.updateOne({ examId, questionId, userId }, { answerSelected, answerStatus, isCorrect, qn: correctAnswer.qn, optionNo, correctAnswer: correctAnswer.answer });
                        return {
                            message: "Answer Update Successfully",
                            status: true,
                            data: data,
                        }
                    } else {
                        let answerData = new answersheetModel({ userId, examId, questionId, answerSelected, answerStatus, isCorrect, qn: correctAnswer.qn, optionNo, correctAnswer: correctAnswer.answer });
                        let data = await answerData.save();
                        return {
                            message: "Answer Saved Successfully",
                            status: true,
                            data: data,
                        }
                    };
                } else {
                    return {
                        message: "invlid credentails",
                        status: false,
                        data: {},
                    }
                }
            } else {
                return {
                    message: "Invalid Question ID",
                    status: false,
                    data: {}
                }
            };

        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    // get questionDetails ...........................
    async getQuestionDetails(req) {
        try {
            let { id: userId } = req.user;
            let { examId, questionId } = req.body;
            if (mongoose.Types.ObjectId.isValid(questionId) && questionId && (mongoose.Types.ObjectId.isValid(examId) || examId == null)) {
                let questionData = await answersheetModel.findOne({ userId, examId, questionId }, { answerSelected: 1, answerStatus: 1, qn: 1, optionNo: 1 });
                if (questionData && questionData !== {}) {
                    return {
                        message: "Details Fetched.",
                        status: true,
                        data: questionData,
                    }
                } else {
                    return {
                        message: "Details Unavailable",
                        status: false,
                        data: {}
                    }
                }
            } else {
                return {
                    message: "invalid question id",
                    status: false,
                    data: {}
                }
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    //review anshwersheet 
    async reviewAnswerSheet(req) {
        try {
            let { id: userId } = req.user;
            let { examId: examId } = req.body;
            if (mongoose.Types.ObjectId.isValid(userId) && userId && (mongoose.Types.ObjectId.isValid(examId) || examId == null)) {
                let answersheet = await answersheetModel.find({ examId, userId }, { qn: 1, questionId: 1, answerSelected: 1, answerStatus: 1, optionNo: 1 }).sort({ qn: 1 });
                let totalQuestion = await questionModel.find({ examId });
                if (answersheet && Array.isArray(answersheet) && answersheet.length > 0) {
                    let totalAttempt = 0;
                    for (let i of answersheet) {
                        if (i.answerSelected !== null) {
                            totalAttempt++;
                        }
                    };
                    return {
                        message: "answer sheet Fetched",
                        status: true,
                        data: { answersheet, totalAttempt, notAttempt: totalQuestion.length - totalAttempt, },
                    }
                } else {
                    return {
                        message: "invalid credentials",
                        status: false,
                        data: {},
                    }
                }
            } else {
                return {
                    message: "Invalid user ID",
                    status: false,
                    data: {},
                }
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    //submit answerSheet  ........
    async finalSumit(req) {
        try {
            let { id: userId } = req.user;
            let { examId: examId } = req.body;
            if (mongoose.Types.ObjectId.isValid(userId) && userId && (mongoose.Types.ObjectId.isValid(examId) || examId == null)) {
                let alreadySubmitted = await scoreCardModel.findOne({ examId, userId });
                if (alreadySubmitted && alreadySubmitted !== {}) {
                    return {
                        message: "Already Submited!!",
                        status: false,
                        data: {}
                    }
                } else {
                    let answerData = await answersheetModel.find({ examId, userId }).sort({ qn: 1 });
                    let answerSheet = [];
                    let totalCorrect = 0;
                    let totalIncorrect = 0;
                    let totalMarks = 0;
                    for (let i of answerData) {
                        let data = {};
                        data.questionNo = i.qn;
                        data.questionId = i.questionId;
                        data.answerData = i.answerSelected;
                        data.optionNo = i.optionNo;
                        data.answerStatus = i.answerStatus;
                        data.correctAnswer = i.correctAnswer;
                        data.isCorrect = i.isCorrect;
                        if (i.isCorrect == true) {
                            totalCorrect++;
                            totalMarks += 4;
                        };
                        if (i.isCorrect == false) {
                            totalIncorrect++;
                            totalMarks -= 1;
                        }
                        answerSheet.push(data);
                    }
                    //saving score card to database;
                    let scoreCard = scoreCardModel({ examId, userId, answerSheet, totalCorrect, totalIncorrect, totalMarks });
                    let scoreCardData = await scoreCard.save();
                    if (scoreCardData && scoreCardData !== {}) {
                        return {
                            message: "Score Card Generated",
                            status: true,
                            data: scoreCardData
                        }
                    } else {
                        return {
                            message: "Error!!",
                            status: false,
                            data: {}
                        }
                    }
                }
            } else {
                return {
                    message: "Invalid user ID",
                    status: false,
                    data: {},
                }
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

    //score card  .....................
    async scoreCard(req) {
        try {
            let { id: userId } = req.user;
            let { examId } = req.body;
            if (mongoose.Types.ObjectId.isValid(userId) && userId && (mongoose.Types.ObjectId.isValid(examId) || examId == null)) {
                let scoreCard = await scoreCardModel.findOne({ examId, userId });
                if (scoreCard && scoreCard !== {}) {
                    return {
                        message: "Score Card Fetched",
                        status: true,
                        data: scoreCard,
                    }
                } else {
                    return {
                        message: "Score card not found",
                        status: false,
                        data: {},
                    }
                }
            } else {
                return {
                    message: "invalid user Id",
                    status: false,
                    data: {},
                }
            };
        } catch (error) {
            return {
                message: error.toString(),
                status: false,
                data: {},
            };
        }
    };

};

module.exports = new examServices();