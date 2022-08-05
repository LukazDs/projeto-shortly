import { Router } from 'express';
import { shortenUrl } from '../controllers/urlsController.js';

const router = Router();

router.post('/urls/shorten', shortenUrl);

export default router;
