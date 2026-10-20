const serviceService = require('./service.service');

const createService = async (req, res, next) => {
    try {
        const newId = await serviceService.createService(req.body);
        res.status(201).json({ success: true, message: 'Servicio creado', data: { id_servicio: newId } });
    } catch (error) {
        res.status(error.statusCode || 400).json({ success: false, message: error.message });
    }
};

const getAllServices = async (req, res, next) => {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        next(error);
    }
};

const getServiceById = async (req, res, next) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }
};

const updateService = async (req, res, next) => {
    try {
        const response = await serviceService.updateService(req.params.id, req.body);
        res.status(200).json({ success: true, message: response.message });
    } catch (error) {
        res.status(error.statusCode || 400).json({ success: false, message: error.message });
    }
};

const deleteService = async (req, res, next) => {
    try {
        const response = await serviceService.deleteService(req.params.id);
        res.status(200).json({ success: true, message: response.message });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};