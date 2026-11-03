const appointmentRepository = require('./appointment.repository');

/**
 * Crea una cita aplicando las reglas de negocio.
 */
const createAppointment = async (data) => {
    const { fecha, hora, id_especialista } = data;

    // REGLA 1: No permitir fechas en el pasado
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
    const fechaCita = new Date(fecha);

    if (fechaCita < hoy) {
        throw new Error('No se pueden agendar citas en fechas pasadas.');
    }

    // REGLA 2: Verificar disponibilidad del especialista
    const isBusy = await appointmentRepository.checkAvailability(id_especialista, fecha, hora);

    if (isBusy) {
        const error = new Error('El especialista ya tiene una cita agendada en este horario.');
        error.statusCode = 409; // 409 Conflict
        throw error;
    }

    // Si pasa las reglas, se guarda en BD
    const newId = await appointmentRepository.createAppointment(data);
    return newId;
};

/**
 * Obtiene todas las citas.
 */
const getAllAppointments = async () => {
    return await appointmentRepository.findAllAppointments();
};

/**
 * Obtiene una cita por ID.
 */
const getAppointmentById = async (id) => {
    const appointment = await appointmentRepository.findAppointmentById(id);
    if (!appointment) {
        const error = new Error('Cita no encontrada.');
        error.statusCode = 404; // 404 Not Found
        throw error;
    }
    return appointment;
};

/**
 * Cancela una cita validando las 24 horas de anticipación.
 */
const cancelAppointment = async (id) => {
    const appointment = await getAppointmentById(id);

    if (appointment.estado === 'CANCELADA') {
        throw new Error('La cita ya está cancelada.');
    }

    // REGLA 3: Cancelación con 24 horas de anticipación
    const fechaHoraCita = new Date(`${appointment.fecha}T${appointment.hora}`);
    const ahora = new Date();

    const diferenciaHoras = (fechaHoraCita - ahora) / (1000 * 60 * 60);

    if (diferenciaHoras < 24) {
        throw new Error('Las citas solo pueden cancelarse con al menos 24 horas de anticipación.');
    }

    await appointmentRepository.updateStatus(id, 'CANCELADA');
    return { message: 'Cita cancelada exitosamente.' };
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    cancelAppointment
};