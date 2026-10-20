const specialistRepository = require('./specialist.repository');

// GET: Ver las citas del especialista

const getMyAppointments = async (req, res) => {
    try {
        const { id_especialista } = req.params;
        const appointments = await specialistRepository.getAppointmentsBySpecialist(id_especialista);
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener citas', error: error.message });
    }
};

//PATCH: Marcar cita como completada
 
const markAppointmentCompleted = async (req, res) => {
    try {
        const { id_cita } = req.params;
        await specialistRepository.completeAppointment(id_cita);

        res.status(200).json({
            success: true,
            message: 'Cita marcada como COMPLETADA exitosamente'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la cita', error: error.message });
    }
};

module.exports = {
    getMyAppointments,
    markAppointmentCompleted
};