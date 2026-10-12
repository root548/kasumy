const express = require('express'); // Importa Express
const app = express(); // Crea la aplicación
// Permite recibir información en formato JSON
app.use(express.json());

app.get('/api/health', (req, res) => {
 res.status(200).json({
 status: 'ok',
 message: 'SICE API is running'
 });
});

module.exports = app; // Permite utilizar app desde otros archivos