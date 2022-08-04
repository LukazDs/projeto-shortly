import { Router } from 'express';
import { insertCustomer } from '../controllers/customersController.js';

const router = Router();

router.get('/customers', insertCustomer);

export default router;
