import connection from "../dbStrategy/database.js";
import urlSchema from "../schemas/urlSchema.js";

async function validateUrlById(req, res, next) {

    const userId = req.params.id ? req.params.id : res.locals.userId;

    const query = `SELECT * FROM urls WHERE id = $1`;
    const { rows: urlDb } = await connection.query(query, [userId]);

    if (!urlDb.length) {

        res.sendStatus(404);
        return;

    }

    res.locals.urlDb = urlDb;

    next();

}

async function validateUrlByShortUrl(req, res, next) {

    const validation = urlSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    const { shortUrl } = req.params;

    const query = `SELECT * FROM urls WHERE "shortUrl" = $1`;
    const { rows: urlDb } = await connection.query(query, [shortUrl]);

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
