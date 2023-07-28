const express = require('express');
const authController = require('../controllers/auth.controller')
const refreshToken = require('../controllers/token.controller');
const authenticate = require('../middlewares/authenticate');
const getUser = require('../controllers/user.controller');
const surveys = require('../controllers/survey.controller');

const router = express.Router();

//Ruta para Sign Up
router.post('/signup', authController.signUp);
//Ruta para Sign In
router.post('/signin', authController.signIn);
//Ruta para Sign Out
router.delete('/signout', authController.signOut);
//Ruta user
router.get('/user', authenticate(), getUser);
//Ruta refresh token
router.post('/refresh-token', refreshToken);
//Ruta para obtener encuestas
router.get('/surveys', authenticate(), surveys.getSurveys);
//Ruta para obtener encuesta por ID
router.get('/surveys/:id', authenticate(), surveys.getSurveyById);
//Ruta para crear encuesta
router.post('/surveys', authenticate(), surveys.createSurveys);
//Ruta para eliminar encuestas
router.delete('/surveys/:id', authenticate(), surveys.deleteSurvey);
//Ruta para actualzar encuesta
router.put('/surveys/:id', authenticate(), surveys.updateSurvey);
//Ruta publica para obtener encuestas publicas
router.get('/public-survey/:id', authenticate(false), surveys.getSurveyById);
//Ruta para encuestas respondidas 
router.post('/public-survey', authenticate(false), surveys.createAnswers);
//Ruta para obtener respuestas por ID
router.get('/results/:surveyId', authenticate(), surveys.getAnswersById); 

module.exports = router;