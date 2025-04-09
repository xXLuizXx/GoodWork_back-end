import { Request, Response } from "express";
import { AproveJobsUseCase } from "./AproveJobsUseCase";
import { container } from "tsyringe";

class AproveJobsController{
    async aproveJob(resquest: Request, response: Response): Promise<Response>{
        const { id_vacancy, valid }  = resquest.body;
        const aproveJobsUseCase = container.resolve(AproveJobsUseCase);
        
        await aproveJobsUseCase.aproveJob(id_vacancy, valid);
    
        return response.status(200).json({ message: "Vaga atualizada com sucesso" });
    }
}

export { AproveJobsController }