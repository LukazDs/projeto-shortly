import { Router } from 'express';
import { shortenUrl } from '../controllers/urlsController.js';
import { validateAuthorizationUrl } from '../middlewares/validateUrl.js';

const router = Router();

router.post('/urls/shorten', validateAuthorizationUrl, shortenUrl);

export default router;
