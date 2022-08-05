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

        const query = `INSERT INTO urls (url, "shortUrl") VALUES ($1, $2)`;
        
        await connection.query(query, [req.body.url, shortUrl])

        res.status(201).send({ shortUrl });

    } catch (error) {

        res.sendStatus(500);

    }
}