import service from './service';
import { validate_schema } from './validation/validator';
import { log_service_schema, fetch_logs_service_schema } from './validation/index';
import { Request, Response } from "express";

const controller = () => {
  const create_log = async (req: Request, res: Response) => {
    try {
      req.body.app_id = req.headers['app-id'] || 'default_app_id';// Add app_id from headers to the request body
      const validate_data = validate_schema(log_service_schema, req.body);
      const service_response = await (await service()).logMessage(validate_data);
      res.status(200).json({ success: true, message: 'Message logged successfully', data: service_response });
    } catch (error: any) {
      console.error('Error in controller:', error);
      res.status(400).json({ error: error.message || 'Internal Server Error' });
    }
  }


  const fetch_logs = async (req: Request, res: Response) => {
    try {
      const app_id = req.headers['app-id'] || 'default_app_id';
      console.log('Received request to fetch logs with query parameters:', { query: req.query, headers: req.headers });
      const validate_data = validate_schema(fetch_logs_service_schema, { ...req.query, app_id });
      console.log('Validated data for fetching logs:---', validate_data);
      const logs = await (await service()).fetchLogs(validate_data);
      res.status(200).json({ success: true, data: logs });
    } catch (error: any) {
      console.error('Error fetching logs:', error);
      res.status(400).json({ error: error.message || 'Failed to fetch logs' });
    }
  }

  return {
    create_log,
    fetch_logs
  }
}
export default controller;