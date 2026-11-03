const appointmentService = require('./appointment.service');

/**
 * Maneja la petición POST para crear una cita.
 */
const createAppointment = async (req, res) => {
    try {
        const newAppointmentId = await appointmentService.createAppointment(req.body);
        res.status(201).json({
            success: true,
            message: 'Cita agendada exitosamente',
            data: { id_cita: newAppointmentId }
        });
    } catch (error) {
        // Si el error tiene un código de estado específico (ej. 409), lo usamos.
        // Si no, enviamos un 400 (Bad Request) por defecto.
        res.status(error.statusCode || 400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Maneja la petición GET para listar todas las citas.
 */
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Maneja la petición PATCH para cancelar una cita.
 */
const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await appointmentService.cancelAppointment(id);
        res.status(200).json({
            success: true,
            message: response.message
        });
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    cancelAppointment
};