
import express from 'express';
const router = express.Router();
import logController from './controller';

// Example route: GET /
router.post('/log', logController().create_log);
router.get('/log', logController().fetch_logs);

// Export the router
export default router;