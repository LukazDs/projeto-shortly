import connection from "../dbStrategy/database.js";
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { urlRepository } from "../repositories/getUrl.js";

dotenv.config();

export async function shortenUrl(req, res) {

    try {

        const VISIT_COUNT = 0;

        const shortUrl = nanoid(8).toLowerCase();

        const { userId } = res.locals;

        const bindParams = [req.body.url, shortUrl, VISIT_COUNT, userId];

        await urlRepository.insertUrl(bindParams);

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

        const bindParams = [newVisitCount, id];

        await urlRepository.updateVisitCountUrl(bindParams);

        res.status(200).redirect(url);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function deleteUrl(req, res) {

    try {

        const { id } = req.params;

        await connection.query(query, [id]);

        res.sendStatus(204);

    } catch (error) {

        res.sendStatus(500);

    }
}
