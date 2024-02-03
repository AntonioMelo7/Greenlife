const router = require("express").Router();
const User = require ('./../models/User.model');
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
    const { name, email, user, password, datebirth, gender, location, description } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: hashedPassword,
            datebirth: datebirth,
            gender: gender,
            location: location,
            description: description
        });

        const savedUser = await newUser.save();
        
        res.json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/deleteUser/:user", async (req, res, next) => {
    const username = req.params.user;

    try {
        const sanitizedUsername = sanitizeAndValidate(username);

        const deletedUser = await User.deleteOne({ user: sanitizedUsername });

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
        const foundUser = await User.findOne({ user: username });

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

        if (updatedUser.nModified === 1) {
            res.json({ message: "Usuario actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    try {
        const foundUser = await User.findOne({ user: username });

        if (!foundUser) {
            return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, secure: true, sameSite: 'strict' });

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
