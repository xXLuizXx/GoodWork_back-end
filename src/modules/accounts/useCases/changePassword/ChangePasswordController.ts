import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangePasswordUseCase } from "./ChangePasswordUseCase";

class ChangePasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { current_password, new_password } = request.body;

        const changePasswordUseCase = container.resolve(ChangePasswordUseCase);
        await changePasswordUseCase.execute({ user_id, current_password, new_password });

        return response.status(204).send();
    }
}

export { ChangePasswordController };
