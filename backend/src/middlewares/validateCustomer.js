import connection from "../dbStrategy/database.js";

async function validateCustomer(req, res, next) {

    const { email } = req.body;

    const query = 'SELECT * FROM customers WHERE email = $1';
    const { rows: customer } = await connection.query(query, [email]);

    if (customer.length !== 0) {

        res.sendStatus(409);
        return;

    }

    next();

}

export {validateCustomer};