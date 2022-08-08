import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema, customerSchema } from "../schemas/customerSchema.js";
import { userRepository } from "../repositories/getCustomer.js";

async function validateAuthorization(req, res, next) {

    try {

        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        const email = jwt.verify(token, process.env.JWT_SECRET);

        const { rows: infoUser } = await userRepository.getCustomer(email);

        if (!infoUser.length) {

            res.sendStatus(401);
            return;

        }

        res.locals.userId = infoUser[0].id;

        next();

    } catch (error) {

        res.sendStatus(401);

    }
}

async function validateInsertCustomer(req, res, next) {

    const validation = customerSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    const { email } = req.body;

    const { rows: customers } = await userRepository.getCustomer(email);

    if (customers.length) {

        res.sendStatus(409);
        return;

    }

    next();

}

async function validateLogin(req, res, next) {

    const { email, password } = req.body;

    const validation = loginSchema.validate(req.body)

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    const { rows: infoUser } = await userRepository.getCustomer(email);

    if (!infoUser.length) {

        res.sendStatus(401);
        return;

    }

    if (!bcrypt.compareSync(password, infoUser[0].password)) {

        res.sendStatus(401);
        return;

    }

    next();

}

export { validateInsertCustomer, validateAuthorization, validateLogin };
