const authService = require("./auth.service");
async function login(req, res, next) {
    try {
        const { email, contrasena } = req.body;
        const result = await authService.login(
            email,
            contrasena
        );
        return res.status(200).json({
            message: "Login successful",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { login };