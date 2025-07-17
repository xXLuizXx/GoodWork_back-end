import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController{
    async handle(request: Request, response: Response): Promise<Response>{
        const {id} = request.user;
        const { name, description, user_id } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        const finalUserId = user_id || id;

        await createCategoryUseCase.execute({name, description, user_id: finalUserId,});
        return response.status(201).send();
    }
}

export { CreateCategoryController }