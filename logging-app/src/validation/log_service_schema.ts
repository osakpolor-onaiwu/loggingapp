import joi from 'joi';

const log_service_schema = joi.object({
    key:joi.string().required(),
    data:joi.object().required(),
    type:joi.string().valid('info', 'error', 'debug', 'warn').default('info'),
    app_id:joi.string().required()
})

export interface LogServiceSchema {
    key: string;
    data: any;
    type?: 'info' | 'error' | 'debug' | 'warn';
    app_id: string;
}
export default log_service_schema;