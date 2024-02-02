const router = require("express").Router();
const Event = require ('./../models/User.model')
const crypto = require('crypto');

router.post("/createUser", async (req, res, next) => {
    const { name, email, user, password, datebirth, gender, location, description } = req.body;

    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const newUser = new User({
            name: name,
            email: email,
            user: user,
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
        const deletedUser = await User.deleteOne({ user: username });

        if (deletedUser.deletedCount === 1) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
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
        // PREGUNTAR SI ACTUALIZAR POR ID O POR NOMBRE DE USUARIO
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

module.exports = router;