const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            default: 'nombre desconocido'
        },

        type: {
            type: String,
            required: true,
            enum: ['shop', 'evento']
        },

        image: {
            type: String,

            default: "https://images.pexels.com/photos/3962260/pexels-photo-3962260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },

        location: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: [Number],
        },

        description: {
            type: String,
            required: true,
            default: 'introduce description'
        },

        transport: {
            type: String,
            default: 'introduce closest transport'
        },

        website: {
            type: String,
        },

        rating: {
            type: Number,
            required: true,
            default: 'introduce rating',
            min: 1,
            max: 5,
        }

    },

    {
        timestamps: true
    }

);


const Evento = model("Evento", eventSchema);

module.exports = Evento;