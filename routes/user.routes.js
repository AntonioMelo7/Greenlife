const router = require("express").Router();
const User = require ('./../models/User.models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const sanitizeAndValidate = (username) => {
    if (typeof username !== 'string') {
        throw new Error('El nombre de usuario debe ser una cadena de texto');
    }

    const sanitizedUsername = username.trim();

    const minLength = 3;
    const maxLength = 20;
    if (sanitizedUsername.length < minLength || sanitizedUsername.length > maxLength) {
        throw new Error(`La longitud del nombre de usuario debe estar entre ${minLength} y ${maxLength} caracteres`);
    }

    return sanitizedUsername;
};

router.post("/signup", async (req, res, next) => {
    const { name, email, username, password, datebirth, gender, location, description } = req.body;

    try {
        // Validación del nombre de usuario...
        const sanitizedUsername = sanitizeAndValidate(username);

        // Validación de la contraseña antes de hashearla
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
            throw new Error(`La contraseña no cumple con los requisitos.`);
        }

        const newUser = new User({
            name: name,
            email: email,
            username: sanitizedUsername,
            password: password, // Almacenamos la contraseña sin hashear
            datebirth: datebirth,
            gender: gender,
            location: location,
            description: description
        });

        // Hasheamos la contraseña antes de guardarla en la base de datos
        newUser.password = await bcrypt.hash(password, 10);

        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/deleteUser/:id", async (req, res, next) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.deleteOne({ _id: userId });

        if (deletedUser.deletedCount === 1) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/user/:id/profile', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            name: user.name,
            email: user.email,
            username: user.username,
            datebirth: user.datebirth,
            gender: user.gender,
            location: user.location,
            description: user.description,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/admin/:id/profile', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            name: user.name,
            email: user.email,
            username: user.username,
            datebirth: user.datebirth,
            gender: user.gender,
            location: user.location,
            description: user.description,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/getUserByUsername/:username", async (req, res, next) => {
    const username = req.params.username;

    try {
        const foundUser = await User.findOne({ username: username });

        if (foundUser) {
            res.json(foundUser);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put("/updateUser/:userId", async (req, res, next) => {
    const userId = req.params.userId;
    const updatedData = req.body;

    try {
        const updatedUser = await User.updateOne({ _id: userId }, { $set: updatedData });
            res.json({ message: "Usuario actualizado correctamente" });         
        
    } catch (error) {
        res.status(500).json(error);
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username: username });

        if (!foundUser) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Nombre de usuario incorrecto" });
        }

        console.log("Contraseña almacenada:", foundUser.password);
        console.log("Contraseña proporcionada:", password);

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        console.log("Inicio de sesión exitoso");
       /*ESTO DA ERROR Y NO VEO COMO ARREGLARLO
        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, secure: true, sameSite: 'strict' });
*/
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.json({ message: 'Sesión cerrada exitosamente' });
});

module.exports = router;
