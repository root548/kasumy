const express = require('express');
const router = express.Router();
const clientController = require('./client.controller');
const { validateCreateClient, validateUpdateClient } = require('./client.validator');

// Rutas del módulo de Clientes
// URL base: /api/clientes

router.post('/', validateCreateClient, clientController.createClient);

router.get('/', clientController.getAllClients);

router.get('/:id', clientController.getClientById);

router.put('/:id', validateUpdateClient, clientController.updateClient);

router.delete('/:id', clientController.deleteClient);

module.exports = router;