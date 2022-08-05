import connection from "../dbStrategy/database.js";
import { customerSchema } from "../schemas/customerSchema.js";

export async function insertCustomer(req, res) {

    try {

        const validation = customerSchema.validate(req.body);

        if (validation.error) {

            res.sendStatus(422);
            return;

        }

        const { name, email, password } = req.body;
        const params = [name, email, password];

        const query = `
            INSERT INTO customers (name, email, password)
            VALUES ($1, $2, $3)
        `;

        await connection.query(query, params);

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function loginCustomer(req, res) {

    try {

        const validation = customerSchema.validate(req.body);

        if (validation.error) {

            res.sendStatus(422);
            return;

        }
        
        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);

    }
}
