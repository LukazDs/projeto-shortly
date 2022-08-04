import connection from "../dbStrategy/database.js";

export async function insertCustomer(req, res) {

    try {

        const { name, email, password } = req.body;

        const params = [name, email, password];

        const query = `
            INSERT INTO customers (name, email, password)
            VALUES ($1, $2, $3)
        `;

        const { rows: customers } = await connection.query(query, params);

        res.send(200);

    } catch (error) {

        res.sendStatus(500);

    }
}
