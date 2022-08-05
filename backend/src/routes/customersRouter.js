import { Router } from 'express';
import { insertCustomer, loginCustomer } from '../controllers/customersController.js';
import { validateCustomer, validateLogin } from '../middlewares/validateCustomers.js';

const router = Router();

router.post('/signup', validateCustomer, insertCustomer);
router.post('/signin', validateLogin, loginCustomer);

export default router;
