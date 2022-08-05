import connection from "../dbStrategy/database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { customerSchema, loginSchema } from "../schemas/customerSchema.js";

dotenv.config();

export async function shortenUrl(req, res) {

    try {

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}