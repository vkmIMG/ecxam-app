const examServices = require("../services/examServices");

class examController {
    constructor() {
        return {
            addQuestion: this.addQuestion.bind(this),
            getQuestions: this.getQuestions.bind(this),
            saveAnswer: this.saveAnswer.bind(this),
            getQuestionDetails: this.getQuestionDetails.bind(this),
            reviewAnswerSheet: this.reviewAnswerSheet.bind(this),
            finalSubmit: this.finalSubmit.bind(this),
            scoreCard: this.scoreCard.bind(this),
        }
    }

    //addQuestion .............................
    async addQuestion(req, res, next) {
        try {
            let result = await examServices.addQuestion(req);
            if (result.status) {
                res.status(200).json(result)
            } else {
                res.status(400).json(result)
            }
        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    // get questions .................................
    async getQuestions(req, res, next) {
        try {
            let result = await examServices.getQuestions(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    // save answer ...................................
    async saveAnswer(req, res, next) {
        try {
            let result = await examServices.saveAnswer(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }

        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    //get qeustion details.
    async getQuestionDetails(req, res, next) {
        try {
            let result = await examServices.getQuestionDetails(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    // review anshwer sheet ..
    async reviewAnswerSheet(req, res, next) {
        try {
            let result = await examServices.reviewAnswerSheet(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }

        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    //final Submit 
    async finalSubmit(req, res, next) {
        try {
            let result = await examServices.finalSumit(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(400).json(error.toString());
        }
    };

    //score card
    async scoreCard(req, res, next) {
        try {
            let result = await examServices.scoreCard(req);
            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(400).json(error.toString());
        }
    }

}

module.exports = new examController();