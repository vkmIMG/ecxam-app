// packages ...........................
const express = require("express");
const router = express.Router();

//middleware.......................
const auth = require("../middleware/auth");

// controller ......................
const userController = require('../controller/userController');
const examController = require('../controller/examController');

// userController ........................
// user registration .....
router.post('/signup', userController.signup);
// user login  ............
router.post('/signin', userController.signin);

//Exam Controller....................
//get questions
router.get("/getQuestions", auth, examController.getQuestions);
//add question 
router.post('/addQuestion', auth, examController.addQuestion);
//save answer 
router.post("/saveAnswer", auth, examController.saveAnswer);
// questions Deatails.
router.post("/getQuestionDetails", auth, examController.getQuestionDetails);
//review answer Sheet ....
router.post("/reviewAnswerSheet", auth, examController.reviewAnswerSheet);
//finalSubmit ..................
router.post("/finalSubmit", auth, examController.finalSubmit);
//scorecard ..................................
router.post("/scoreCard", auth, examController.scoreCard);


module.exports = router;