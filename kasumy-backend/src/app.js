const express = require('express');
const cors = require("cors");

const userRoutes = require('./modules/users/user.routes');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require("./modules/auth/auth.routes");
const appointmentRoutes = require('./modules/appointments/appointment.routes');
const reportRoutes = require('./modules/reports/report.routes');


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());






const specialistRoutes = require('./modules/specialists/specialist.routes');
app.use('/api/specialists', specialistRoutes);
const clientRoutes = require('./modules/clientes/client.routes');
const serviceRoutes = require('./modules/services/service.routes');











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


// Rutas de reportes
app.use('/api/reports', reportRoutes);

module.exports = app;