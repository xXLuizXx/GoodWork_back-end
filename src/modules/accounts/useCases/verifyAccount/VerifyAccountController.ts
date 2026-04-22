import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyAccountUseCase } from "./VerifyAccountUseCase";

class VerifyAccountController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;

        const verifyAccountUseCase = container.resolve(VerifyAccountUseCase);
        await verifyAccountUseCase.execute(String(token));

        return response.status(204).send();
    }
}

export { VerifyAccountController };
