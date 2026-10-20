const express = require('express');

const userRoutes = require('./modules/users/user.routes');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require("./modules/auth/auth.routes");
const appointmentRoutes = require('./modules/appointments/appointment.routes');
const app = express();
const specialistRoutes = require('./modules/specialists/specialist.routes');
app.use('/api/specialists', specialistRoutes);
const clientRoutes = require('./modules/clientes/client.routes');
const serviceRoutes = require('./modules/services/service.routes');









app.use(express.json());

// Comprobación del servidor

app.get('/api/health', (req, res) => {
 res.status(200).json({
 status: 'ok',
 message: 'SICE API is running'
 });
});

// Rutas de usuarios
app.use('/api/users', userRoutes);
// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Middleware global de errores
app.use(errorHandler);
// Rutas de citas
app.use('/api/citas', appointmentRoutes);



// Rutas de clientes
app.use('/api/clientes', clientRoutes);
// Rutas de servicios
app.use('/api/services', serviceRoutes);

module.exports = app;