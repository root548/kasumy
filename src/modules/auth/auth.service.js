const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");
async function login(email, contrasena) {
    const user = await authRepository.findByEmail(email);
    // Caso 1: Usuario no encontrado
    if (!user) {
        console.warn("Login rejected: user not found");
        const error = new Error("Invalid credentials usuario no encontrado");
        error.status = 401;
        throw error;
    }
    // Caso 2: Usuario desactivado
    if (user.activo !== 1) {
        console.warn("Login rejected: inactive user");
        const error = new Error("Invalid credentials usuario desactivado");
        error.status = 401;
        throw error;
    }
    // Caso 3: Contraseña incorrecta
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
        console.warn("Login rejected: incorrect password");
        const error = new Error("Invalid credentials contraseña incorrecta");
        error.status = 401;
        throw error;
    }
    // Caso 4: Autenticación correcta
    const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    });
    return {
        token,
        user: {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            email: user.email,
            id_rol: user.id_rol,
        },
    };
}


async function getProfile(id) {
    const user = await authRepository.findById(id);
    if (!user || user.activo !== 1) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    return {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        id_rol: user.id_rol,
        activo: user.activo
    };
}

module.exports = {
    login, getProfile
};