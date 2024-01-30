const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            default: 'nombre desconocido'
        },

        image: {
            type: String,

            default: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },


        description: {
            type: String,
            required: true,
            default: 'introduce description'
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


const Plants = model("Evento", plantSchema);

module.exports = Plants;