const express = require('express');
const router = express.Router();
const specialistController = require('./specialist.controller');
const authorizeRoles = require('../../middlewares/role.middleware');

// Ver citas del especialista
// URL: GET /api/specialists/1/appointments
router.get('/:id_especialista/appointments',
    authorizeRoles(1, 2), specialistController.getMyAppointments);

// Marcar cita como completada
// URL: PATCH /api/specialists/appointments/1/complete
router.patch('/appointments/:id_cita/complete',
    authorizeRoles(1, 2), specialistController.markAppointmentCompleted);

// Obtener todos los especialistas para listas
// URL: GET /api/specialists
router.get('/', specialistController.getAllSpecialists);




module.exports = router;