import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCandidateInterviewUseCase } from "./GetCandidateInterviewUseCase";

class GetCandidateInterviewController {

    async getCandidateInterview(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { application_id } = request.query as { application_id: string };

        const getCandidateInterviewUseCase = container.resolve(GetCandidateInterviewUseCase);
        const interview = await getCandidateInterviewUseCase.execute(application_id, user_id);

        return response.status(200).json(interview);
    }
}

export { GetCandidateInterviewController }
