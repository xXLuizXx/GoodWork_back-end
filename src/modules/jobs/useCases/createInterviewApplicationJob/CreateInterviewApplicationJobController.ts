import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateInterviewApplicationJobUseCase } from "./CreateInterviewApplicationJobUseCase";

class CreateInterviewApplicationJobController{
    async createInterviewApplicationJob(request: Request, response: Response): Promise<Response>{
        const {
            application_id,
            interview_type,
            scheduled_date,
            duration_minutes,
            location,
            meeting_link,
            interviewer_name,
            interviewer_email,
            notes,
            status
        } = request.body;

        const createInterviewUseCase = container.resolve(CreateInterviewApplicationJobUseCase);

        try {
            await createInterviewUseCase.execute({
                application_id,
                interview_type,
                scheduled_date,
                duration_minutes,
                location,
                meeting_link,
                interviewer_name,
                interviewer_email,
                notes,
                status,
            });

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { CreateInterviewApplicationJobController }