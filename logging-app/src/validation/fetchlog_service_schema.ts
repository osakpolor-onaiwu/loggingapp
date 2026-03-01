import joi from 'joi';

const fetch_logs_service_schema = joi.object({
    key:joi.string().required(),
    type:joi.string().valid('info', 'error', 'debug', 'warn'),
    app_id:joi.string().required()
})

export interface FetchLogsServiceSchema {
    key: string;
    type?: 'info' | 'error' | 'debug' | 'warn';
    app_id: string;
}

export default fetch_logs_service_schema;