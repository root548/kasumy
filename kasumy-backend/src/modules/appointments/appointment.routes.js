const express = require('express');
const router = express.Router();
const appointmentController = require('./appointment.controller');
const { validateCreateAppointment, validateCancelAppointment } = require('./appointment.validator');
// Si tienes un middleware de autenticación, lo importarías aquí:
// const { verifyToken } = require('../../middlewares/auth.middleware');

// RUTAS DEL MÓDULO DE CITAS

// 1. Crear una cita (POST)
router.post(
    '/',
    // verifyToken, // Descomenta esta línea si ya tienes tu middleware de seguridad
    validateCreateAppointment,
    appointmentController.createAppointment
);

// 2. Obtener todas las citas (GET)
router.get(
    '/',
    // verifyToken, 
    appointmentController.getAllAppointments
);

// 3. Cancelar una cita (PATCH)
router.patch(
    '/:id/cancelar',
    // verifyToken, 
    validateCancelAppointment,
    appointmentController.cancelAppointment
);

module.exports = router;