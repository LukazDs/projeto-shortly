import connection from "../dbStrategy/database.js";
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import urlSchema from "../schemas/urlSchema.js";

dotenv.config();

export async function shortenUrl(req, res) {

    try {

        const validation = urlSchema.validate(req.body);

        if (validation.error) {

            res.sendStatus(422);
            return;

        }

        const shortUrl = nanoid(8).toLowerCase();

        const { userId } = res.locals;

        const query = `INSERT INTO urls (url, "shortUrl", "customerId") VALUES ($1, $2, $3)`;

        await connection.query(query, [req.body.url, shortUrl, userId])

        res.status(201).send({ shortUrl });

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function getUrl(_req, res) {

    try {

        const { urlDb } = res.locals;

        const { url, shortUrl, visitCount } = urlDb[0];
        const payload = { url, shortUrl, visitCount };

        res.status(200).send(payload);

    } catch (error) {

        res.sendStatus(500);

    }
}
