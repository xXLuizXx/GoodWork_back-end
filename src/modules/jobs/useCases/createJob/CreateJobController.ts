import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateJobUseCase } from "./CreateJobUseCase"

class CreateJobController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id
        } = request.body;
        const createJobUseCase = container.resolve(CreateJobUseCase);

        const job = await createJobUseCase.execute({
            vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id 
        });

        return response.status(201).json(job);
    }
}

export { CreateJobController }