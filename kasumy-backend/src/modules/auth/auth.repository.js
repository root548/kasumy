//auth.repository.js
const pool = require("../../config/database");
async function findByEmail(email) {
    const [rows] = await pool.execute(
        `SELECT
 id_usuario,
 nombre,
 email,
 contrasena,
 id_rol,
 activo
 FROM usuario
 WHERE email = ?
 AND deleted_at IS NULL`,
        [email]
    );
    return rows[0];
}
async function findById(id) {
    const [rows] = await pool.execute(
        `SELECT
 id_usuario,
 nombre,
 email,
 id_rol,
 activo
 FROM usuario
 WHERE id_usuario = ?
 AND deleted_at IS NULL`,
        [id]
    );
    return rows[0];
}
module.exports = {
    findByEmail,
    findById
};