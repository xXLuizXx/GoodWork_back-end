import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetApplicationsForUserUseCase } from "./GetApplicationsForUserUseCase";

class GetApplicationsForUserController {

    async getMyApplications(request: Request, response: Response): Promise<Response>{
        const { id: user_id } = request.user;
        const getApplicationsForUserUseCase = container.resolve(GetApplicationsForUserUseCase);

        const myApplications = await getApplicationsForUserUseCase.execute(user_id);

        return response.status(200).json(myApplications);
    }
}

export { GetApplicationsForUserController }
