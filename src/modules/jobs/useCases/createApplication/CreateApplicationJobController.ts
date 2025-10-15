import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateApplicationJobUseCase } from "./CreateApplicationJobUseCase";

class CreateApplicationJobController{

    async createApplication(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        const {job_id, user_id} = request.body;
        const curriculum_user = request.file.filename;
        const finalUserId = user_id || id;
        const applicantionVacancy = container.resolve(CreateApplicationJobUseCase);

        const application = await applicantionVacancy.execute({user_id: finalUserId, job_id, curriculum_user});

        return response.status(200).json(application);
        
    }
}

export { CreateApplicationJobController }