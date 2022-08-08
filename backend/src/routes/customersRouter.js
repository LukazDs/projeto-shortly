import { Router } from 'express';
import { validateAuthorization } from '../middlewares/validateAuth.js';
import { validateInsertCustomer, validateLogin } from '../middlewares/validateAuth.js';
import { insertCustomer, loginCustomer } from '../controllers/authController.js';
import { getUrlsMe } from '../controllers/customersController.js';

const router = Router();

router.post('/signup', validateInsertCustomer, insertCustomer);
router.post('/signin', validateLogin, loginCustomer);
router.get('/users/me', validateAuthorization, getUrlsMe);

export default router;
