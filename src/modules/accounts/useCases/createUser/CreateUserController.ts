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
        var fileCurriculum = null;
        if (request.body.user_type === "company"){
            fileCurriculum = null;
        }else{
            fileCurriculum = request.file.filename;
        }    

        const createUserUseCase = container.resolve(CreateUserUseCase);

        try {
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
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { CreateUserController };
