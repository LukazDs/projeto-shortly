import connection from "../dbStrategy/database.js";

export async function getUrlsMe(_req, res) {

    try {

        const { userId } = res.locals;

        let query = `
            SELECT customers.id, customers.name, coalesce(SUM(urls."visitCount"), 0)
            AS "visitCount" 
            FROM customers 
            LEFT JOIN urls ON customers.id = urls."customerId" 
            WHERE customers.id = $1 
            GROUP BY urls."customerId", customers.id`;

        const { rows: infoUser } = await connection.query(query, [userId]);

        query = `
            SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls 
            WHERE urls."customerId" = $1`;

        const { rows: infoUrls } = await connection.query(query, [userId]);

        const body = { ...infoUser[0], shortenedUrls: infoUrls };

        res.status(200).send(body);

    } catch (error) {

        res.sendStatus(500);

    }
}
