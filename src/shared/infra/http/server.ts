process.env.TZ = 'UTC';
import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import "../../container";
import "../../container/providers";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import cors from "cors";

createConnection();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { message: "Muitas tentativas. Tente novamente em 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/sessions", authLimiter);
app.use("/refresh-token", authLimiter);

app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error`,
    });
});

app.listen(3333, () => console.log("Servidor rodando na porta 3333"));
