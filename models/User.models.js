const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //ver si el id se pone autoincremental aqui o en la bbdd
    id: { type: Number, unique: true, required: true },
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
      validate: {
        validator: function(value) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(value);
        },
        message: props => `${props.value} no es una contraseña válida. Debe contener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.`,
      },
    },
    datebirth: {
      type: Date,
      required: [true, 'Es obligatorio incluir una fecha de nacimiento']
    },
    gender: {
        type: String,
        required: [true, 'Es obligatorio seleccionar un género'],
        enum: ['masculino', 'femenino', 'otro'],
      },
    location: {
      type: String,
      required: [true, 'Es obligatorio incluir una localidad']
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