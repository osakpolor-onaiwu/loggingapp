import log_model from './entity/logging';
import { LogServiceSchema } from './validation/log_service_schema';
import { FetchLogsServiceSchema } from './validation/fetchlog_service_schema';

const service = async (opts = {}) => {
    const logMessage = async (data: LogServiceSchema) => {
        try {
            const { key, data: logData, app_id, type } = data;
            if (!key || !logData || !app_id) throw new Error('Key, data, and app_id are required');
            // Simulate an asynchronous operation, e.g., saving to a database or logging to a file
            return await log_model.create({ key, data, app_id, type });


        } catch (error: any) {
            console.error('Error in logMessage service:', error);
            throw new Error(error.message || 'Failed to log message');
        }
    };



    const fetchLogs = async (data: FetchLogsServiceSchema) => {
        try {
            const { key, app_id, type } = data;
            if (!key) throw new Error('Key is required to fetch logs');
            if (!app_id) throw new Error('app_id is required to fetch logs');
            const query: FetchLogsServiceSchema = { key, app_id };
            if (type) query.type = type;
            return await log_model.find(query);
        } catch (error: any) {
            console.error('Error in fetchLogs service:', error);
            throw new Error(error.message || 'Failed to fetch logs');
        }
    }

    return {
        logMessage,
        fetchLogs
    }
}


export default service;