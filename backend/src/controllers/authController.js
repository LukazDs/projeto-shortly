import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from "../repositories/getCustomer.js";

dotenv.config();

export async function insertCustomer(req, res) {

    try {

        const { name, email, password } = req.body;

        const passwordHash = bcrypt.hashSync(password, 10);

        const bindParams = [name, email, passwordHash];

        await userRepository.insertCustomer(bindParams);

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
