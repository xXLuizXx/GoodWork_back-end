import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateJobUseCase } from "./CreateJobUseCase"

class CreateJobController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            vacancy,
            contractor,
            description_vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id,
            user_id
        } = request.body;
        const createJobUseCase = container.resolve(CreateJobUseCase);

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
            user_id
        });

        return response.status(201).json(job);
    }
}

export { CreateJobController }