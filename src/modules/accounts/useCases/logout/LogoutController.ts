import { Request, Response } from "express";
import { container } from "tsyringe";
import { LogoutUseCase } from "./LogoutUseCase";

class LogoutController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { refresh_token } = request.body;
        const logoutUseCase = container.resolve(LogoutUseCase);
        await logoutUseCase.execute(refresh_token);

        return response.status(204).send();
    }
}

export { LogoutController };
