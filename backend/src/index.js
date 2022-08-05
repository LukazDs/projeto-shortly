import express from "express";
import dotenv from "dotenv";
import customersRouter from "./routes/customersRouter.js";
import urlsRouter from "./routes/urlsRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(customersRouter);
app.use(urlsRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Conexão estabelecida! PORTA ${PORT}`));
