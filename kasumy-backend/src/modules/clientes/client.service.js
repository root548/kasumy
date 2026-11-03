const clientRepository = require('./client.repository');

/**
 * Crea un cliente validando que el email no esté registrado.
 */
const createClient = async (data) => {
    // Regla de negocio: Validar si el email ya existe
    if (data.email) {
        const existingClient = await clientRepository.findClientByEmail(data.email);
        if (existingClient) {
            const error = new Error('El correo electrónico ya está registrado con otro cliente.');
            error.statusCode = 409; // Conflict
            throw error;
        }
    }

    const newId = await clientRepository.createClient(data);
    return newId;
};

/**
 * Obtiene todos los clientes.
 */
const getAllClients = async () => {
    return await clientRepository.getAllClients();
};

/**
 * Obtiene un cliente por ID.
 */
const getClientById = async (id) => {
    const client = await clientRepository.getClientById(id);
    if (!client) {
        const error = new Error('Cliente no encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return client;
};

/**
 * Actualiza un cliente.
 */
const updateClient = async (id, data) => {
    await getClientById(id); // Verifica que exista
    await clientRepository.updateClient(id, data);
    return { message: 'Cliente actualizado correctamente' };
};

/**
 * Elimina lógicamente un cliente.
 */
const deleteClient = async (id) => {
    await getClientById(id); // Verifica que exista
    await clientRepository.deleteClientLogical(id);
    return { message: 'Cliente eliminado correctamente' };
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};
