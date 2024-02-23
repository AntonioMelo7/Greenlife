const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Es obligatorio inlcuir un nombre'],
      minlength: [3, 'El nombre debe tener min, 3 caracteres']
  
    },
    image: {
        type: String
      },

    description: {
        type: String,
      },

    
  },
  {
  
    timestamps: true,
  }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;