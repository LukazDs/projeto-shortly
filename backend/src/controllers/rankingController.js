import connection from "../dbStrategy/database.js";

export async function getRanking(_req, res) {

    try {

        const query = `
            SELECT customers.id, customers.name, COUNT(urls."customerId") 
            AS "linksCount", coalesce(SUM(urls."visitCount"), 0) AS "visitCount" FROM customers 
            LEFT JOIN urls ON customers.id = urls."customerId" 
            GROUP BY customers.id ORDER BY "visitCount" DESC LIMIT 10`;

        const { rows: payload } = await connection.query(query);

        res.status(200).send(payload);

    } catch (error) {

        res.sendStatus(500);

    }
}
