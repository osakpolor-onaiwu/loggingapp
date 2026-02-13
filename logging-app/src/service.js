const log_model = require('./entity/logging');

const service = async (opts={}) => {
    const logMessage = async ({ key, data }) => {
        try {
            if (!key || !data) throw new Error('Key and data are required');
            // Simulate an asynchronous operation, e.g., saving to a database or logging to a file
            return await log_model.create({ key, data });

        } catch (error) {
            console.error('Error in logMessage service:', error);
            throw new Error('Failed to log message');
        }
    };

    return {
        logMessage
    }
}


module.exports = service;