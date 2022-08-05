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

async function validateLogin(req, res) {
    
    const { email, password } = req.body;

    const query = `
            SELECT * FROM customers 
            WHERE email = $1 AND password = $2
        `;

    const { rows: infoUser } = await connection(query, [email, password]);

    if (!infoUser.length) {

        res.sendStatus(401);

    }
}

export { validateCustomer, validateLogin };