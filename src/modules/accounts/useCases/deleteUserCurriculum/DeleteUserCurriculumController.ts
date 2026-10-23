import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserCurriculumUseCase } from "./DeleteUserCurriculumUseCase";

class DeleteUserCurriculumController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const deleteUserCurriculumUseCase = container.resolve(DeleteUserCurriculumUseCase);
        await deleteUserCurriculumUseCase.execute(id);

        return response.status(204).send();
    }
}

export { DeleteUserCurriculumController };
