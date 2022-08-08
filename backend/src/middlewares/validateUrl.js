import { urlRepository } from "../repositories/getUrl.js";

async function validateUrlById(req, res, next) {

    const userId = req.params.id ? req.params.id : res.locals.userId;

    const { rows: urlDb } = await urlRepository.getUrlById(userId);

    if (!urlDb.length) {

        res.sendStatus(404);
        return;

    }

    res.locals.urlDb = urlDb;

    next();

}

async function validateUrlByShortUrl(req, res, next) {

    const { shortUrl } = req.params;

    const { rows: urlDb } = await urlRepository.getUrlByShortUrl(shortUrl);

    if (!urlDb.length) {

        res.sendStatus(404);
        return;

    }

    res.locals.urlDb = urlDb;

    next();

}

async function validateUrlIdByCustomer(_req, res, next) {

    const { userId, urlDb } = res.locals;

    if (userId !== urlDb[0].customerId) {

        res.sendStatus(401);
        return;

    }

    next();

}

export { validateUrlById, validateUrlByShortUrl, validateUrlIdByCustomer };
