import connection from "../dbStrategy/database.js";
import jwt from 'jsonwebtoken';

async function validateAuthorizationUrl(req, res, next) {

    try {

        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        const email = jwt.verify(token, process.env.JWT_SECRET);

        const query = `SELECT * FROM customers WHERE email = $1`;
        const { rows: infoUser } = await connection.query(query, [email]);

        if (!infoUser) {

            res.sendStatus(401);
            return;

        };

        res.locals.userId = infoUser[0].id;

        next();

    } catch (error) {

        res.sendStatus(401);

    }
}

export { validateAuthorizationUrl };
