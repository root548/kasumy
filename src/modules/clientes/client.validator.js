const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors: errors.array().map(err => ({ campo: err.path, mensaje: err.msg }))
        });
    }
    next();
};

const validateCreateClient = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto'),
    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un correo válido'),
    body('telefono')
        .optional()
        .isString().withMessage('El teléfono debe ser texto'),
    validateResult
];

const validateUpdateClient = [
    param('id').isInt().withMessage('El ID debe ser numérico'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    validateResult
];

module.exports = {
    validateCreateClient,
    validateUpdateClient
};