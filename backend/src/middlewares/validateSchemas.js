import { insertCustomerSchema, loginSchema } from "../schemas/customerSchema.js";
import urlSchema from "../schemas/urlSchema.js";

export async function validateBodySignUp(req, res, next) {

    const validation = insertCustomerSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    next();

}

export async function validateBodySignIn(req, res, next) {

    const validation = loginSchema.validate(req.body)

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    next();

}

export async function validateBodyUrl(req, res, next) {

    const validation = urlSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    next();

}
