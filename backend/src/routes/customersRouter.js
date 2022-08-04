import { Router } from 'express';
import { insertCustomer } from '../controllers/customersController.js';
import { validateCustomer } from '../middlewares/validateCustomer.js';

const router = Router();

router.post('/signup', validateCustomer, insertCustomer);

export default router;
