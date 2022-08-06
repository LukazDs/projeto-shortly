import { Router } from 'express';
import { getUrl, openUrl, shortenUrl } from '../controllers/urlsController.js';
import { validateAuthorizationUrl, validateUrlById, validateUrlByShortUrl } from '../middlewares/validateUrl.js';

const router = Router();

router.post('/urls/shorten', validateAuthorizationUrl, shortenUrl);
router.get('/urls/:id', validateUrlById, getUrl);
router.get('/urls/open/:shortUrl', validateUrlByShortUrl, openUrl);

export default router;
