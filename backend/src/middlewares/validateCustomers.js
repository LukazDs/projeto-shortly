import connection from "../dbStrategy/database.js";
import bcrypt from 'bcrypt';
import { loginSchema } from "../schemas/customerSchema.js";


async function validateCustomer(req, res, next) {

    const { email } = req.body;

    const query = 'SELECT * FROM customers WHERE email = $1';
    const { rows: customers } = await connection.query(query, [email]);

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

    const query = `SELECT * FROM customers  WHERE email = $1`;
    const { rows: infoUser } = await connection.query(query, [email]);

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

export { validateCustomer, validateLogin };
