import connection from "../dbStrategy/database.js";
import bcrypt from 'bcrypt';

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

    const query = `SELECT * FROM customers  WHERE email = $1`;
    const { rows: infoUser } = await connection.query(query, [email]);

    if (!infoUser.length) {

        res.status(401).send("Email ou password inválidos");
        return;

    }

    if (!bcrypt.compareSync(password, infoUser[0].password)) {

        res.status(401).send("Email ou password inválidos");
        return;

    }

    next();

}

export { validateCustomer, validateLogin };