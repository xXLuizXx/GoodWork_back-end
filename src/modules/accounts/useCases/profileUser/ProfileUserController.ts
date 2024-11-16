import { Request, Response } from "express";
import { ProfileUserUseCase} from "./ProfileUserUseCase";
import { container } from "tsyringe";

class ProfileUserController{  
    async handle(request: Request, response: Response): Promise<Response>{
        const {id} = request.user;
        
        const getProfilleUser = container.resolve(ProfileUserUseCase);
        const user = await getProfilleUser.execute({id});
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json(user);
    }

    async updateDataProfileUser(request: Request, response: Response): Promise<Response>{
        const { id, road, number, neighborhood, telephone, functionn, ability, is_employee } = request.body;
        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        await profileUserUseCase.updateProfile({id, road, number, neighborhood, telephone, functionn, ability, is_employee});
        return await response.status(200).send();
    }
}

export { ProfileUserController };