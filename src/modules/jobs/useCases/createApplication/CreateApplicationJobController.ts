import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateApplicationJobUseCase } from "./CreateApplicationJobUseCase";

class CreateApplicationJobController{

    async createApplication(request: Request, response: Response): Promise<Response>{
        const { user_id, job_id, curriculum_user } = request.body;

        const createApplicationJobUseCase = container.resolve(CreateApplicationJobUseCase);
        try{
            await createApplicationJobUseCase.execute({user_id, job_id, curriculum_user});

            return response.status(201).send();
        }catch(error){
            return response.status(400).json({ error: error.message });
        }
        
    }
}

export { CreateApplicationJobController }