import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {name,
            road,
            number,
            identifier,
            neighborhood,
            sex,
            telephone,
            is_employee,
            functionn,
            email,
            password,
            access_type} = request.body;
        
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            road,
            number,
            identifier,
            neighborhood,
            sex,
            telephone,
            is_employee,
            functionn,
            email,
            password,
            access_type
        });

        return response.status(201).send();
    }
}

export { CreateUserController }