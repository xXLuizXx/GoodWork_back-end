import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetInterviewApplicationJobUseCase } from "./GetInterviewApplicationJobUseCase";

class GetInterviewApplicationJobController{
    async getInterviewApplicationJob(request: Request, response: Response): Promise<Response>{
        const { application_id } = request.body;
        const company_user_id = request.user.id;
        const getInterviewApplicationJobUseCase = container.resolve(GetInterviewApplicationJobUseCase);

        try {
            const interview = await getInterviewApplicationJobUseCase.execute(application_id, company_user_id);

            return response.status(200).json(interview);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { GetInterviewApplicationJobController }