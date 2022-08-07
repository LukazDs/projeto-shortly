import { Router } from 'express';
import { deleteUrl, getUrl, openUrl, shortenUrl } from '../controllers/urlsController.js';
import { validateAuthorizationUrl, validateUrlById, validateUrlByShortUrl, validateUrlIdByCustomer } from '../middlewares/validateUrl.js';

const router = Router();

router.post('/urls/shorten', validateAuthorizationUrl, shortenUrl);
router.get('/urls/:id', validateUrlById, getUrl);
router.get('/urls/open/:shortUrl', validateUrlByShortUrl, openUrl);
router.delete('/urls/:id', validateAuthorizationUrl, validateUrlById, validateUrlIdByCustomer, deleteUrl);

export default router;
