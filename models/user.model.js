const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'por favor, introduce una dirección de email válida'],

    },

    password: {
      type: String,
      required: true,
      message: "por favor, introduce una contraseña"
    },

    avatar: {
      type: String,
    },

    favorites: {
      type: [String],
      default: [],
      ref: "Esquejes"
    }

  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;