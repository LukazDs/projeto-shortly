import connection from "../dbStrategy/database.js";

async function getRanking() {

    const query = `
        SELECT customers.id, customers.name, 
        COUNT(urls."customerId") AS "linksCount", 
        coalesce(SUM(urls."visitCount"), 0) AS "visitCount" 
        FROM customers 
        LEFT JOIN urls ON customers.id = urls."customerId" 
        GROUP BY customers.id ORDER BY "visitCount" DESC LIMIT 10`;

    return connection.query(query);

}

export const rankingRepository = { getRanking };
