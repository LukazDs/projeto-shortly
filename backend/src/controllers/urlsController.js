import connection from "../dbStrategy/database.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import urlSchema from "../schemas/urlSchema.js";

dotenv.config();

export async function shortenUrl(req, res) {

    try {

        const validation = urlSchema.validate(req.body);

        if(validation.error) {
            
            res.sendStatus(422);
            return;

        }

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}