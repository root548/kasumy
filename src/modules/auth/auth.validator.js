function validateLogin(req, res, next) {
    const { email, contrasena } = req.body;
    if (
        typeof email !== "string" ||
        !email.trim() ||
        typeof contrasena !== "string" ||
        !contrasena
    ) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }
    next();
}
module.exports = { validateLogin };