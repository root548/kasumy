const reportRepository = require('./report.repository');

const getDashboardStats = async (req, res) => {
    try {
        const stats = await reportRepository.getStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al generar reportes', error: error.message });
    }
};

const getDashboardCounts = async (req, res) => {
    try {
        const stats = await reportRepository.getDashboardStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error', error: error.message });
    }
};

module.exports = { getDashboardStats, getDashboardCounts };