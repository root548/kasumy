const pool = require('../../config/database');

/**
 * Crea un nuevo servicio.
 */
const createService = async (data) => {
    const { nombre, duracion, precio, descripcion } = data;
    const query = `
        INSERT INTO servicio (nombre, duracion, precio, descripcion) 
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [nombre, duracion, precio, descripcion]);
    return result.insertId;
};

/**
 * Obtiene todos los servicios activos.
 */
const getAllServices = async () => {
    const query = 'SELECT * FROM servicio WHERE activo = true';
    const [rows] = await pool.query(query);
    return rows;
};

/**
 * Busca un servicio por ID.
 */
const getServiceById = async (id) => {
    const query = 'SELECT * FROM servicio WHERE id_servicio = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Actualiza un servicio.
 */
const updateService = async (id, data) => {
    const { nombre, duracion, precio, descripcion } = data;
    const query = `
        UPDATE servicio 
        SET nombre = ?, duracion = ?, precio = ?, descripcion = ? 
        WHERE id_servicio = ?
    `;
    await pool.query(query, [nombre, duracion, precio, descripcion, id]);
};

/**
 * Elimina lógicamente un servicio.
 */
const deleteServiceLogical = async (id) => {
    const query = 'UPDATE servicio SET activo = false WHERE id_servicio = ?';
    await pool.query(query, [id]);
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteServiceLogical
};