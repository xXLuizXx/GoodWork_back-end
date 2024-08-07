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
}

export { ProfileUserController };