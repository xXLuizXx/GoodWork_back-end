import { Request, Response } from "express";
import { container } from "tsyringe";
import { CloseOrOpenVacancyUseCase } from "./CloseOrOpenVacancyUseCase";

class CloseOrOpenVacancyController{
    async closeOrOpenVacancy(request: Request, response: Response): Promise<Response>{
        const { id, valid } = request.body;

        const closeOrOpenVacancyUseCase = container.resolve(CloseOrOpenVacancyUseCase);
        const job = await closeOrOpenVacancyUseCase.execute(id, valid);

        if(job){
            return response.json(job).status(200);
        }else{
            return response.status(400).json({ message: "Erro ao atualizar status da vaga!" });
        }

    }
}

export { CloseOrOpenVacancyController }