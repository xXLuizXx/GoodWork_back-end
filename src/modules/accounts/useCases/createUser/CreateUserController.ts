import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            road,
            number,
            identifier,
            neighborhood,
            telephone,
            email,
            password,
            user_type,
            sex,
            is_employee,
            functionn,
            ability,
            business_area,
            categories_interest,
        } = request.body;
        const fileCurriculum = request.body.user_type === "company" ? null : request.file?.filename ?? null;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        // Erros (AppError) seguem para o handler global, que responde { message }
        await createUserUseCase.execute({
            name,
            road,
            number,
            identifier,
            neighborhood,
            telephone,
            email,
            password,
            user_type: request.body.user_type,
            sex,
            is_employee,
            functionn,
            ability,
            curriculum: fileCurriculum,
            categories_interest,
            business_area,
        });

        return response.status(201).send();
    }
}

export { CreateUserController };
