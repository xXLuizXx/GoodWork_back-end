import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersForStringUseCase } from "./ListUsersForStringUseCase";

class ListUsersForStringController {

    async listAllUsersSearch(request: Request, response: Response): Promise<Response>{
        const { id, search } = request.body;
        const listUsersForStringUseCase = container.resolve(ListUsersForStringUseCase);

        try{
            const users = await listUsersForStringUseCase.listAllUsersSearch(search, id);

            if(users){
                return response.json(users).status(200);
            }else{
                return response.json({ message: "Nenhum perfil encontrado!"});
            }
        }catch(error){
            return response.json({ message: error});
        }
    }
}

export { ListUsersForStringController }