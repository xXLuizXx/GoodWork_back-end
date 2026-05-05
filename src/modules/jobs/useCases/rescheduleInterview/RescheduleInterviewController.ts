import { Request, Response } from "express";
import { container } from "tsyringe";
import { RescheduleInterviewUseCase } from "./RescheduleInterviewUseCase";

class RescheduleInterviewController{

    async rescheduleInterview(request: Request, response: Response): Promise<Response>{
        
        const { id: company_id } = request.user;
        const { interview_id, ...dataReschedule } = request.body;

        const rescheduleInterviewUseCase = container.resolve(RescheduleInterviewUseCase);
        await rescheduleInterviewUseCase.execute(dataReschedule, interview_id, company_id);

        return response.status(200).json();
    }
}

export { RescheduleInterviewController }
