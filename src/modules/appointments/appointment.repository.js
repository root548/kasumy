const pool = require('../../config/database');

/**
 * Crea una nueva cita en la base de datos.
 */
const createAppointment = async (data) => {
    // Ahora también recibimos 'observaciones'
    const { fecha, hora, id_cliente, id_especialista, id_servicio, observaciones } = data;

    const query = `
        INSERT INTO cita (fecha, hora, id_cliente, id_especialista, id_servicio, estado, observaciones) 
        VALUES (?, ?, ?, ?, ?, 'AGENDADA', ?)
    `;

    // Pasamos observaciones (si no viene, enviará null)
    const [result] = await pool.query(query, [
        fecha, hora, id_cliente, id_especialista, id_servicio, observaciones || null
    ]);
    return result.insertId;
};

/**
 * Obtiene todas las citas con los nombres relacionados.
 */
const findAllAppointments = async () => {
    const query = `
        SELECT 
            c.id_cita, 
            c.fecha, 
            c.hora, 
            c.estado,
            c.observaciones,
            cl.nombre AS nombre_cliente,
            esp.nombre AS nombre_especialista,
            serv.nombre AS nombre_servicio
        FROM cita c
        INNER JOIN cliente cl ON c.id_cliente = cl.id_cliente
        INNER JOIN especialista esp ON c.id_especialista = esp.id_especialista
        INNER JOIN servicio serv ON c.id_servicio = serv.id_servicio
        ORDER BY c.fecha DESC, c.hora DESC
    `;

    const [rows] = await pool.query(query);
    return rows;
};

/**
 * Busca una cita por su ID.
 */
const findAppointmentById = async (id) => {
    const query = 'SELECT * FROM cita WHERE id_cita = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Actualiza los datos de una cita.
 */
const updateAppointment = async (id, data) => {
    const { fecha, hora, id_especialista, id_servicio, observaciones } = data;
    const query = `
        UPDATE cita 
        SET fecha = ?, hora = ?, id_especialista = ?, id_servicio = ?, observaciones = ? 
        WHERE id_cita = ?
    `;

    await pool.query(query, [fecha, hora, id_especialista, id_servicio, observaciones || null, id]);
};

/**
 * Cambia el estado de una cita.
 */
const updateStatus = async (id, status) => {
    // fecha_modificacion se actualizará solo si en MySQL configuraste ON UPDATE CURRENT_TIMESTAMP
    // Si no, podríamos agregarlo aquí, pero tu BD ya lo tiene configurado.
    const query = 'UPDATE cita SET estado = ? WHERE id_cita = ?';
    await pool.query(query, [status, id]);
};

/**
 * Verifica si un especialista ya tiene una cita en esa fecha y hora.
 */
const checkAvailability = async (id_especialista, fecha, hora) => {
    const query = `
        SELECT id_cita 
        FROM cita 
        WHERE id_especialista = ? AND fecha = ? AND hora = ? AND estado != 'CANCELADA'
    `;

    const [rows] = await pool.query(query, [id_especialista, fecha, hora]);
    return rows.length > 0;
};

module.exports = {
    createAppointment,
    findAllAppointments,
    findAppointmentById,
    updateAppointment,
    updateStatus,
    checkAvailability
};