import { Router } from 'express';
import { getUrl, shortenUrl } from '../controllers/urlsController.js';
import { validateAuthorizationUrl, validateUrlById } from '../middlewares/validateUrl.js';

const router = Router();

router.post('/urls/shorten', validateAuthorizationUrl, shortenUrl);
router.get('/urls/:id', validateUrlById, getUrl);
router.get('/urls/open/:shortUrl');

export default router;
