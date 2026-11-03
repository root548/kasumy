const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');

// Ruta para la página de Reportes (Ventas y Top Servicio)
// URL: /api/reports
router.get('/', reportController.getDashboardStats);

// Ruta para las tarjetas del Dashboard (Contadores)
// URL: /api/reports/dashboard
router.get('/dashboard', reportController.getDashboardCounts);

module.exports = router;