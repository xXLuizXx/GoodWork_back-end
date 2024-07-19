import { Request, Response } from "express";
import { ProfileUserUseCase} from "./ProfileUserUseCase";
import { container } from "tsyringe";


class ProfileUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const getProfilleUser = container.resolve(ProfileUserUseCase);
        const dataUser = await getProfilleUser.execute();
        return response.json(dataUser);
    }
}

export { ProfileUserController };