import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express"
import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import "../../container";
import "../../container/providers";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import cors from "cors";
import dotenv from 'dotenv';

createConnection();
const app = express();
app.use(express.json());
app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors())
app.use(router);
dotenv.config();
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) { 
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
});
app.listen(3333, () => console.log("Rodou----------------------"));