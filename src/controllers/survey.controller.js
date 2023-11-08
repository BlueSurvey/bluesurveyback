const jsonResponse = require("../libs/jsonResponse");
const Survey = require('../models/survey')
const Answers = require("../models/answers")
const getAnswerInfo = require("../libs/getAnswersInfo");

const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find({ idUser: req.user.id })
        if (surveys) {
            res.json(surveys)
        } else {
            res.status(404).json(jsonResponse({ error: "Encuestas no encontradas" }))
        }
    } catch (error) {
        console.log(error)
    }
}

const getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findById({ _id: req.params.id })
        if (survey) {
            res.json(survey)
        } else {
            res.status(404).json(jsonResponse({ error: "Encuesta no encontrada" }))
        }
    } catch (error) {
    }
}

const createSurveys = async (req, res) => {

    const { title, description, questions } = req.body;

    if (!!!title || !!!description) {
        res.status(400).json(jsonResponse(400, {
            error: "Los campos son requeridos"
        }));

        return
    }
    // Crear encuesta
    try {

        const survey = Survey({ title, description, questions, idUser: req.user.id });
        const newSurvey = await survey.save();

        res.json(newSurvey)

    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear la encuesta",
            error
        }))
        console.log(error)
    }

}

const updateSurvey = async (req, res) => {

    const { id } = req.params
    const { title, description, questions } = req.body;

    if (!!!title || !!!description) {
        res.status(400).json(jsonResponse(400, {
            error: "Los campos son requeridos"
        }));

        return
    }
    //Actualizar encuesta
    try {
        await Survey.updateOne({ _id: id }, { $set: { title, description, questions } })
        res.status(200).json(jsonResponse(200, {
            message: "Encuesta actualizada",
        }))
    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al actualizar la encuesta"
        }))
        console.log(error)
    }
}

const deleteSurvey = async (req, res) => {
    try {

        const survey = await Survey.findById({ _id: req.params.id })
        if (survey) {
            survey.deleteOne();
            res.status(200).json(jsonResponse(200, {
                message: 'Encuesta eliminada'
            }))


        } else {
            res.status(400).json(jsonResponse(400, {
                error: 'Encuesta no encontrada'
            }))
        }

    } catch (error) {
        console.log(error)
    }
}

const createAnswers = async (req, res) => {

    const { answers, surveyId } = req.body;

    try {
        // Guardar las respuestas del usuario
        const newAnswers = Answers({ answers, surveyId });
        const saveAnswers = await newAnswers.save();
        res.json(saveAnswers);

    } catch (error) {
        console.error(error);
        res.status(400).json(jsonResponse(400, { error: "Error al guardar las respuestas" }));
    }

};

const getAnswersById = async (req, res) => {

    const surveyId = req.params.surveyId;

    try {
        const survey = await Answers.findOne({ surveyId: surveyId });
        if (survey) {
            const { uniqueAnswersOptionUnica, uniqueAnswersOptionMultiple, uniqueAnswersOptionOpen } = await getAnswerInfo(surveyId);
            res.json({ uniqueAnswersOptionUnica, uniqueAnswersOptionMultiple, uniqueAnswersOptionOpen });
        } else {
            res.status(404).json(jsonResponse(400, {
                error: 'Aun no hay respuestas'
            }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

module.exports = { getSurveys, createSurveys, updateSurvey, getSurveyById, deleteSurvey, createAnswers, getAnswersById }; 