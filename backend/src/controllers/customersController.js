import connection from "../dbStrategy/database.js";
import bcrypt from 'bcrypt';
import { customerSchema } from "../schemas/customerSchema.js";

export async function insertCustomer(req, res) {

    try {

        const validation = customerSchema.validate(req.body);

        if (validation.error) {

            res.sendStatus(422);
            return;

        }

        const { name, email, password } = req.body;

        const passwordHash = bcrypt.hashSync(password, 10);

        const params = [name, email, passwordHash];

        const query = `
            INSERT INTO customers (name, email, password)
            VALUES ($1, $2, $3)
        `;

        /// falta criptografar o password ;)

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

        /// falta gerar o token -> JWT :(
        
        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);

    }
}
