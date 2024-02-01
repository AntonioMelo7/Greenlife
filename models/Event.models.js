const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Es obligatorio inlcuir un nombre'],
      minlength: [3, 'El nombre debe tener min, 3 caracteres']
  
    },
    image: {
        type: String,
      },

    date: {
        type: Date,
        default: Date.now
    },

    location: {
        type: String,
      },

    description: {
        type: String,
      },

    
  },
  {
  
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;