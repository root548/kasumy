//user.repository.js


const pool = require('../../config/database');

// Buscar usuario por correo
async function findByEmail(email) {
 const [rows] = await pool.execute(
 `SELECT id_usuario FROM usuario WHERE email = ?`,
 [email]
 );
 return rows[0];
}

// Buscar rol por ID
async function findRoleById(roleId) {
 const [rows] = await pool.execute(
 'SELECT id_rol FROM rol WHERE id_rol = ?',
 [roleId]
 );
 return rows[0];
}

// Crear usuario
async function create(user) {
 const { nombre, email, contrasena, id_rol } = user;
 const [result] = await pool.execute(
 `INSERT INTO usuario
 (nombre, email, contrasena, id_rol)
 VALUES (?, ?, ?, ?)`,
 [nombre, email, contrasena, id_rol]
 );
 return result.insertId;
}

// Listar usuarios 


//DIA 3
async function findAll() {
 const [rows] = await pool.execute(
 `SELECT
 u.id_usuario,
 u.nombre,
 u.email,
 r.id_rol,
 r.nombre_rol AS rol
 FROM usuario u
 INNER JOIN rol r ON u.id_rol = r.id_rol
 AND deleted_at IS NULL`
 );
 return rows;
}

// Buscar usuario por ID
async function findById(id) {
 const [rows] = await pool.execute(
 `SELECT
 u.id_usuario,
 u.nombre,
 u.email,
 r.id_rol,
 r.nombre_rol AS rol
 FROM usuario u
 INNER JOIN rol r ON u.id_rol = r.id_rol
 WHERE u.id_usuario = ?
 AND u.deleted_at IS NULL`,
 [id]
 );
 return rows[0];
}

// Actualizar usuario
async function update(id, user) {
 const { nombre, email, id_rol } = user;
 const [result] = await pool.execute(
 `UPDATE usuario
 SET nombre = ?, email = ?, id_rol = ?
 WHERE id_usuario = ?
 AND deleted_at IS NULL`,
 [nombre, email, id_rol, id]
 );
 return result.affectedRows;
}

// Cambiar estado
async function updateStatus(id, estado) {
 const [result] = await pool.execute(
 `UPDATE usuario
 SET activo = ?
 WHERE id_usuario = ?
 AND deleted_at IS NULL`,
 [estado, id]
 );
 return result.affectedRows;
}


// Eliminación lógica
async function softDelete(id) {
    const [result] = await pool.execute(
        `UPDATE usuario
 SET deleted_at = NOW(),
 activo= 0
 WHERE id_usuario = ?
 AND deleted_at IS NULL`,
        [id]
    );
    return result.affectedRows;
}



module.exports = {
 findByEmail,
 findRoleById,
 create,
 findAll,
 findById,
 update,
 updateStatus,
 softDelete,

};



