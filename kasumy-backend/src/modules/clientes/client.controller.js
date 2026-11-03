const clientService = require('./client.service');

/**
 * POST: Crear un cliente
 */
const createClient = async (req, res, next) => {
    try {
        const newClientId = await clientService.createClient(req.body);
        res.status(201).json({
            success: true,
            message: 'Cliente creado exitosamente',
            data: { id_cliente: newClientId }
        });
    } catch (error) {
        next(error); // Envía el error al middleware global
    }
};

/**
 * GET: Listar todos los clientes
 */
const getAllClients = async (req, res, next) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json({
            success: true,
            data: clients
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET: Obtener un cliente por ID
 */
const getClientById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await clientService.getClientById(id);
        res.status(200).json({
            success: true,
            data: client
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT: Actualizar un cliente
 */
const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await clientService.updateClient(id, req.body);
        res.status(200).json({
            success: true,
            message: response.message
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE: Eliminar un cliente (lógicamente)
 */
const deleteClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await clientService.deleteClient(id);
        res.status(200).json({
            success: true,
            message: response.message
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};