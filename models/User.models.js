const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
  
    name: {
        type: String,
        required: [true, 'Es obligatorio incluir nombre y apellidos'],
        validate: {
          validator: function(value) {
            const nameRegex = /\s/;
            return nameRegex.test(value);
          },
          message: 'El nombre debe incluir tanto el nombre como los apellidos.',
        },
      },
    email: {
        type: String,
        required: [true, 'Es obligatorio incluir un correo electrónico'],
        unique: [true, 'Este correo electrónico ya está en uso.'],
        validate: {
          validator: function(value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: props => `${props.value} no es un correo electrónico válido.`,
        },
      },

    username: {
        type: String,
        unique: [true, 'Este correo electrónico ya está en uso.'],
        required: [true, 'Es obligatorio incluir un nombre de usuario'],
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
      },
    password: {
      type: String,
      required: [true, 'Es obligatorio incluir una contraseña'],
      
    },
    datebirth: {
      type: Date,
      required: [true, 'Es obligatorio incluir una fecha de nacimiento']
    },
    gender: {
        type: String,
        required: [true, 'Es obligatorio seleccionar un género'],
        enum: ['Masculino', 'Femenino', 'Otro'],
      },
    location: {
      type: String,
      
    },
    description: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', userSchema);

module.exports = UserModel;
