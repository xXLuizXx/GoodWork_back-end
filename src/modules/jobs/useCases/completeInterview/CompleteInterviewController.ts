import { Request, Response } from "express";
import { container } from "tsyringe";
import { CompleteInterviewUseCase } from "./CompleteInterviewUseCase";

class CompleteInterviewController {

    async completeInterview(request: Request, response: Response): Promise<Response> {
        const { id: company_id } = request.user;
        const { interview_id, feedback, hired } = request.body;

        const completeInterviewUseCase = container.resolve(CompleteInterviewUseCase);
        await completeInterviewUseCase.execute({ interview_id, feedback, hired }, company_id);

        return response.status(200).json();
    }
}

export { CompleteInterviewController }
