const pool = require('../../config/database');

// Obtiene las citas asignadas a un especialista específico.
 
const getAppointmentsBySpecialist = async (id_especialista) => {
    const query = `
        SELECT 
            c.id_cita, 
            c.fecha, 
            c.hora, 
            c.estado,
            cl.nombre AS nombre_cliente,
            s.nombre AS nombre_servicio
        FROM cita c
        INNER JOIN cliente cl ON c.id_cliente = cl.id_cliente
        INNER JOIN servicio s ON c.id_servicio = s.id_servicio
        WHERE c.id_especialista = ?
        ORDER BY c.fecha DESC, c.hora DESC
    `;
    const [rows] = await pool.query(query, [id_especialista]);
    return rows;
};

// Cambia el estado de una cita a COMPLETADA.
 
const completeAppointment = async (id_cita) => {
    const query = "UPDATE cita SET estado = 'COMPLETADA' WHERE id_cita = ?";
    await pool.query(query, [id_cita]);
};

module.exports = {
    getAppointmentsBySpecialist,
    completeAppointment
};