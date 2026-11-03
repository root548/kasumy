const { body, param, validationResult } = require('express-validator');


/**
 * Middleware para revisar si hubo errores en las validaciones anteriores
 */
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación en los datos enviados',
            errors: errors.array().map(err => ({ campo: err.path, mensaje: err.msg }))
        });
    }
    next(); // Si todo está bien, continúa al controlador
};

/**
 * Validaciones para crear una cita
 */
const validateCreateAppointment = [
    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('La fecha debe tener formato YYYY-MM-DD'),
    body('hora')
        .notEmpty().withMessage('La hora es obligatoria')
        .matches(/^([01]\d|2[0-3]):?([0-5]\d)(:([0-5]\d))?$/).withMessage('La hora debe tener formato HH:MM'),
    body('id_cliente')
        .notEmpty().withMessage('El ID del cliente es obligatorio')
        .isInt().withMessage('El ID del cliente debe ser un número entero'),
    body('id_especialista')
        .notEmpty().withMessage('El ID del especialista es obligatorio')
        .isInt().withMessage('El ID del especialista debe ser un número entero'),
    body('id_servicio')
        .notEmpty().withMessage('El ID del servicio es obligatorio')
        .isInt().withMessage('El ID del servicio debe ser un número entero'),
    validateResult // Llamamos al middleware de resultados
];

/**
 * Validaciones para cancelar (solo verificar que el ID sea un número)
 */
const validateCancelAppointment = [
    param('id').isInt().withMessage('El ID de la cita debe ser un número entero'),
    validateResult
];

module.exports = {
    validateCreateAppointment,
    validateCancelAppointment
};