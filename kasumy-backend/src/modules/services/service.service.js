const serviceRepository = require('./service.repository');

const createService = async (data) => {
    if (data.precio <= 0) throw new Error('El precio debe ser mayor a 0');
    if (data.duracion <= 0) throw new Error('La duración debe ser mayor a 0');

    return await serviceRepository.createService(data);
};

const getAllServices = async () => {
    return await serviceRepository.getAllServices();
};

const getServiceById = async (id) => {
    const service = await serviceRepository.getServiceById(id);
    if (!service) {
        const error = new Error('Servicio no encontrado');
        error.statusCode = 404;
        throw error;
    }
    return service;
};

const updateService = async (id, data) => {
    await getServiceById(id); // Verifica que exista
    await serviceRepository.updateService(id, data);
    return { message: 'Servicio actualizado' };
};

const deleteService = async (id) => {
    await getServiceById(id);
    await serviceRepository.deleteServiceLogical(id);
    return { message: 'Servicio eliminado' };
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};