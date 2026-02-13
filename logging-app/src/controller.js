const service = require('./service');
const log_service_schema = require('./validation/log_service_schema');
const { validate_schema } = require('./validation/validator');

const controller = async (req, res) => {
  try {
    const validate_data = validate_schema(log_service_schema, req.body);
    const service_response = await (await service()).logMessage(validate_data);
    res.status(200).json({ success: true, message: 'Message logged successfully', data: service_response });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = controller;