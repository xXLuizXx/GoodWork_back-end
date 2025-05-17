import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersForCompanyUseCase } from "./ListUsersForCompanyUseCase";

class ListUsersForCompanyController{

    async listAllUsersForCompany(request: Request, response: Response): Promise<Response>{
        const { id } = request.body;
        const listUsersForCompanyUseCase = container.resolve(ListUsersForCompanyUseCase);

        try{
            const users = await listUsersForCompanyUseCase.listUsersForCompany(id);

            if(users){
                return response.json(users).status(200);
            }else{
                return response.json({message: "Nenhum perfil encontrado!"});
            }
        }catch(error){
            return response.json({message: error});
        }
    }
}

export { ListUsersForCompanyController }