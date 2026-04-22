import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateInterviewApplicationJobUseCase } from "./CreateInterviewApplicationJobUseCase";

class CreateInterviewApplicationJobController{
    async createInterviewApplicationJob(request: Request, response: Response): Promise<Response>{
        const interviews = request.body;

        const createInterviewUseCase = container.resolve(CreateInterviewApplicationJobUseCase);

        try {
            await createInterviewUseCase.execute(interviews);

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { CreateInterviewApplicationJobController }