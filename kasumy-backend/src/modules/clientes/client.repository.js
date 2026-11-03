const pool = require('../../config/database');

/**
 * Crea un nuevo cliente en la base de datos.
 */
const createClient = async (data) => {
    const { nombre, direccion, telefono, email, fecha_nacimiento } = data;
    const query = `
        INSERT INTO cliente (nombre, direccion, telefono, email, fecha_nacimiento) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [nombre, direccion, telefono, email, fecha_nacimiento]);
    return result.insertId;
};

/**
 * Busca un cliente por su correo electrónico (para evitar duplicados).
 */
const findClientByEmail = async (email) => {
    const query = 'SELECT * FROM cliente WHERE email = ? AND activo = true';
    const [rows] = await pool.query(query, [email]);
    return rows[0];
};

/**
 * Obtiene todos los clientes activos.
 */
const getAllClients = async () => {
    const query = 'SELECT * FROM cliente WHERE activo = true';
    const [rows] = await pool.query(query);
    return rows;
};

/**
 * Busca un cliente por su ID.
 */
const getClientById = async (id) => {
    const query = 'SELECT * FROM cliente WHERE id_cliente = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Actualiza los datos de un cliente.
 */
const updateClient = async (id, data) => {
    const { nombre, direccion, telefono, email, fecha_nacimiento } = data;
    const query = `
        UPDATE cliente 
        SET nombre = ?, direccion = ?, telefono = ?, email = ?, fecha_nacimiento = ? 
        WHERE id_cliente = ?
    `;
    await pool.query(query, [nombre, direccion, telefono, email, fecha_nacimiento, id]);
};

/**
 * Eliminación lógica de un cliente (cambia estado activo a false).
 */
const deleteClientLogical = async (id) => {
    const query = 'UPDATE cliente SET activo = false WHERE id_cliente = ?';
    await pool.query(query, [id]);
};

module.exports = {
    createClient,
    findClientByEmail,
    getAllClients,
    getClientById,
    updateClient,
    deleteClientLogical
};