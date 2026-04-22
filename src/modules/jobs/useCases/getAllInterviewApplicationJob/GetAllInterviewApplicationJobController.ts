import { Request, Response } from "express";
import { GetAllInterviewApplicationJobUseCase } from "./GetAllInterviewApplicationJobUseCase";
import { container } from "tsyringe";

class GetAllInterviewApplicationJobController{
    async getAllInterviewApplicationJob(request: Request, response: Response): Promise<Response>{
        const { application_id } = request.query as { application_id: string };
        const company_user_id = request.user.id;
        const getAllInterviewApplicationJobUseCase = container.resolve(GetAllInterviewApplicationJobUseCase);

        try {
            const interview = await getAllInterviewApplicationJobUseCase.execute(application_id, company_user_id);

            return response.status(200).json(interview);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

    }
}

export { GetAllInterviewApplicationJobController }