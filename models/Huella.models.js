const { Schema, model} = require ("mongoose");

const huellaSchema = new Schema (
    {
        question1:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 1'],
        },
        question2:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 2'],
        },
        question3:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 3'],
        },
        question4:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 4'],
        },
        question5:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 5'],
        },
        question6:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 6'],
        },
        question7:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 7'],
        },
        question8:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 8'],
        },
        question9:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 9'],
        },
        question10:{
            type: String,
            required: [true, 'Es obligatorio responder a la pregunta 10'],
        },
    },
    {timestamps: true,}
);

const Huella = model ("Huella", huellaSchema);

module.exports = Huella;
