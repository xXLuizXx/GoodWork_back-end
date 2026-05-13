import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserCurriculumUseCase } from "./UpdateUserCurriculumUseCase";

class UpdateUserCurriculumController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const curriculum_file = request.file.filename;

        const updateUserCurriculumUseCase = container.resolve(UpdateUserCurriculumUseCase);
        await updateUserCurriculumUseCase.execute({ user_id: id, curriculum_file });

        return response.status(204).send();
    }
}

export { UpdateUserCurriculumController };
