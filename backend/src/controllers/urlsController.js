import connection from "../dbStrategy/database.js";
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();

export async function shortenUrl(req, res) {

    try {

        const VISIT_COUNT = 0;

        const shortUrl = nanoid(8).toLowerCase();

        const { userId } = res.locals;

        const query = `
            INSERT INTO urls (url, "shortUrl", "visitCount", "customerId") 
            VALUES ($1, $2, $3, $4)`;

        await connection.query(query, [req.body.url, shortUrl, VISIT_COUNT, userId]);

        res.status(201).send({ shortUrl });

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function getUrl(_req, res) {

    try {

        const { urlDb } = res.locals;

        const { id, url, shortUrl } = urlDb[0];
        const payload = { id, url, shortUrl };

        res.status(200).send(payload);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function openUrl(_req, res) {

    try {

        const { urlDb } = res.locals;

        const { visitCount, id, url } = urlDb[0]

        const newVisitCount = `${Number(visitCount) + 1}`;

        const query = `UPDATE urls SET "visitCount" = $1 WHERE id = $2`;
        await connection.query(query, [newVisitCount, id]);

        res.status(200).redirect(url);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function deleteUrl(req, res) {

    try {

        const { id } = req.params;

        const query = `DELETE FROM urls WHERE id = $1`;
        await connection.query(query, [id]);

        res.sendStatus(204);

    } catch (error) {

        res.sendStatus(500);

    }
}
