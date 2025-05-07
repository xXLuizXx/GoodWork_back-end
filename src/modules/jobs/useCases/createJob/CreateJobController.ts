import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateJobUseCase } from "./CreateJobUseCase"

class CreateJobController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.user;
        const {
            vacancy,
            contractor,
            description_vacancy,
            requirements,
            workload,
            location, 
            benefits,
            category_id,
            user_id,
            amount_vacancy, 
            closing_date,
        } = request.body;
        
        const banner = request.file.filename;
        const createJobUseCase = container.resolve(CreateJobUseCase);
        const finalUserId = user_id || id;

        const job = await createJobUseCase.execute({
            vacancy,
            contractor,
            description_vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id,
            user_id: finalUserId,
            amount_vacancy,
            closing_date,
        });

        return response.status(201).json(job);
    }
}

export { CreateJobController }