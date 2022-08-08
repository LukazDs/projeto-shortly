import joi from "joi";

const insertCustomerSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.ref('password')
})

const loginSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
})

export { insertCustomerSchema, loginSchema };
