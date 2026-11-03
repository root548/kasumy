const pool = require('../../config/database');

// Función para la página de Reportes (Ventas y Top Servicio)
const getStats = async () => {
    // 1. Contar total de citas
    const [citas] = await pool.query('SELECT COUNT(*) as total FROM cita');

    // 2. Sumar el precio de los servicios de las citas COMPLETADAS
    const [ventas] = await pool.query(`
        SELECT SUM(s.precio) as total 
        FROM cita c 
        INNER JOIN servicio s ON c.id_servicio = s.id_servicio 
        WHERE c.estado = 'COMPLETADA'
    `);

    // 3. Contar total de clientes
    const [clientes] = await pool.query('SELECT COUNT(*) as total FROM cliente');

    // 4. Encontrar el servicio más solicitado
    const [topServicio] = await pool.query(`
        SELECT s.nombre, COUNT(c.id_servicio) as cantidad
        FROM cita c
        INNER JOIN servicio s ON c.id_servicio = s.id_servicio
        GROUP BY s.id_servicio, s.nombre
        ORDER BY cantidad DESC
        LIMIT 1
    `);

    return {
        totalCitas: citas[0].total,
        totalVentas: ventas[0].total || 0,
        totalClientes: clientes[0].total,
        topServicio: topServicio.length > 0 ? topServicio[0].nombre : "N/A"
    };
};

// Función para el Dashboard (Contadores de las tarjetas de arriba)
const getDashboardStats = async () => {
    const [citas] = await pool.query('SELECT COUNT(*) as total FROM cita');
    const [clientes] = await pool.query('SELECT COUNT(*) as total FROM cliente');
    const [especialistas] = await pool.query('SELECT COUNT(*) as total FROM especialista');
    const [servicios] = await pool.query('SELECT COUNT(*) as total FROM servicio');

    return {
        totalCitas: citas[0].total,
        totalClientes: clientes[0].total,
        totalEspecialistas: especialistas[0].total,
        totalServicios: servicios[0].total
    };
};

module.exports = { getStats, getDashboardStats };