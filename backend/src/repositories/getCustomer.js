import connection from "../dbStrategy/database.js";

async function getCustomer(email) {

	const query = 'SELECT * FROM customers WHERE email = $1';

	return connection.query(query, [email]);

}

async function insertCustomer(bindParams) {

	const query = `
		INSERT INTO customers (name, email, password)
		VALUES ($1, $2, $3)`;

	return connection.query(query, bindParams);

}

async function infoCustomer(id) {

	const query = `
		SELECT customers.id, customers.name, coalesce(SUM(urls."visitCount"), 0)
		AS "visitCount" 
		FROM customers 
		LEFT JOIN urls ON customers.id = urls."customerId" 
		WHERE customers.id = $1 
		GROUP BY urls."customerId", customers.id`;

	return connection.query(query, [id]);

}

async function infoCustomerUrls(id) {

	const query = `
        SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls 
        WHERE urls."customerId" = $1`;

	return connection.query(query, [id]);

}


export const userRepository = { 
	getCustomer, 
	insertCustomer,
	infoCustomer, 
	infoCustomerUrls 
}
