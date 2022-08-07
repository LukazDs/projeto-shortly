import connection from "../dbStrategy/database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { customerSchema } from "../schemas/customerSchema.js";

dotenv.config();

export async function insertCustomer(req, res) {

    try {

        const validation = customerSchema.validate(req.body);

        if (validation.error) {

            res.sendStatus(422);
            return;

        }

        const { name, email, password } = req.body;

        const passwordHash = bcrypt.hashSync(password, 10);

        const params = [name, email, passwordHash];

        const query = `
            INSERT INTO customers (name, email, password)
            VALUES ($1, $2, $3)
        `;

        await connection.query(query, params);

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function loginCustomer(req, res) {

    try {

        const token = jwt.sign(req.body.email, process.env.JWT_SECRET);

        res.status(200).send({ token });

    } catch (error) {

        res.sendStatus(500);

    }
}
