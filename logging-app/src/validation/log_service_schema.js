const joi = require('joi');

const log_service_schema = joi.object({
    key:joi.string().required(),
    data:joi.object().required()
})

module.exports = log_service_schema;