import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelInterviewUseCase } from "./CancelInterviewUseCase";

class CancelInterviewController {

    async cancelInterview(request: Request, response: Response): Promise<Response> {
        const { id: company_id } = request.user;
        const { interview_id, notice } = request.body;

        const cancelInterviewUseCase = container.resolve(CancelInterviewUseCase);
        await cancelInterviewUseCase.execute({ interview_id, notice, company_id });

        return response.status(200).json();
    }
}

export { CancelInterviewController }
