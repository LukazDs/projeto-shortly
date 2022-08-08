import { Router } from 'express';
import { validateAuthorization } from '../middlewares/validateAuth.js';
import { validateInsertCustomer, validateLogin } from '../middlewares/validateAuth.js';
import { insertCustomer, loginCustomer } from '../controllers/authController.js';
import { getUrlsMe } from '../controllers/customersController.js';
import { validateBodySignIn, validateBodySignUp } from '../middlewares/validateSchemas.js';

const router = Router();

router.post('/signup', validateBodySignUp, validateInsertCustomer, insertCustomer);
router.post('/signin', validateBodySignIn, validateLogin, loginCustomer);
router.get('/users/me', validateAuthorization, getUrlsMe);

export default router;
