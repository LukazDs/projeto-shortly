import connection from "../dbStrategy/database.js";

async function getUrlById(id) {

    const query = `SELECT * FROM urls WHERE id = $1`;

    return connection.query(query, [id]);

};

async function getUrlByShortUrl(shortUrl) {

    const query = 'SELECT * FROM urls WHERE "shortUrl" = $1';

    return connection.query(query, [shortUrl]);

};

async function insertUrl(bindParams) {

    const query = `
        INSERT INTO urls (url, "shortUrl", "visitCount", "customerId") 
        VALUES ($1, $2, $3, $4)`;

    return connection.query(query, bindParams);

};

async function updateVisitCountUrl(bindParams) {

    const query = `UPDATE urls SET "visitCount" = $1 WHERE id = $2`;

    return connection.query(query, bindParams);

};

async function deleteUrl(id) {

    const query = `DELETE FROM urls WHERE id = $1`;

    return connection.query(query, [id]);

};

export const urlRepository = {
    getUrlById,
    getUrlByShortUrl,
    insertUrl,
    updateVisitCountUrl,
    deleteUrl
};
