import connection from "../dbStrategy/database.js";

export async function getCustomers(_req, res) {

    try {

        let query = `SELECT * FROM customers`;

        const { rows: customers } = await connection.query(query);

        res.send(customers);

    } catch (error) {

        res.sendStatus(500);

    }
}
