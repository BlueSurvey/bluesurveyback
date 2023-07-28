const Answers = require("../models/answers");

const getAnswerInfo = (surveyId) => {
    return new Promise((resolve, reject) => {
        Answers.find({ surveyId })
            .then(results => {
                const uniqueAnswersOptionUnica = {};
                const uniqueAnswersOptionMultiple = {};
                const uniqueAnswersOptionOpen = {};

                results.forEach(result => {
                    const { answers } = result;

                    // Verificar respuestas de opción única
                    if (answers && answers['opción unica']) {
                        const optionUnicaAnswer = answers['opción unica'];
                        handleAnswer(uniqueAnswersOptionUnica, optionUnicaAnswer);
                    }

                    // Verificar respuestas de opción múltiple
                    if (answers && answers['opción multiple']) {
                        const optionMultipleAnswer = answers['opción multiple'];
                        handleMultipleAnswers(uniqueAnswersOptionMultiple, optionMultipleAnswer);
                    }

                    // Verificar respuestas abiertas
                    if (answers && answers.abierta) {
                        const openAnswers = answers.abierta;
                        Object.entries(openAnswers).forEach(([question, answer]) => {
                            const field = `${question}: ${answer}`;
                            if (uniqueAnswersOptionOpen[field]) {
                                uniqueAnswersOptionOpen[field]++;
                            } else {
                                uniqueAnswersOptionOpen[field] = 1;
                            }
                        });
                    }
                });

                resolve({ uniqueAnswersOptionUnica, uniqueAnswersOptionMultiple, uniqueAnswersOptionOpen });
            })
            .catch(error => {
                reject(error);
            });

        function handleAnswer(uniqueAnswers, answer) {
            if (typeof answer === 'object' && answer !== null) {
                Object.entries(answer).forEach(([key, value]) => {
                    const field = `${key}: ${value}`;
                    if (uniqueAnswers[field]) {
                        uniqueAnswers[field]++;
                    } else {
                        uniqueAnswers[field] = 1;
                    }
                });
            } else {
                if (uniqueAnswers[answer]) {
                    uniqueAnswers[answer]++;
                } else {
                    uniqueAnswers[answer] = 1;
                }
            }
        }

        function handleMultipleAnswers(uniqueAnswers, answers) {
            Object.entries(answers).forEach(([question, answer]) => {
                if (Array.isArray(answer)) {
                    answer.forEach(choice => {
                        const field = `${question}: ${choice}`;
                        if (uniqueAnswers[field]) {
                            uniqueAnswers[field]++;
                        } else {
                            uniqueAnswers[field] = 1;
                        }
                    });
                } else {
                    const field = `${question}: ${answer}`;
                    if (uniqueAnswers[field]) {
                        uniqueAnswers[field]++;
                    } else {
                        uniqueAnswers[field] = 1;
                    }
                }
            });
        }
    });
};

module.exports = getAnswerInfo;
