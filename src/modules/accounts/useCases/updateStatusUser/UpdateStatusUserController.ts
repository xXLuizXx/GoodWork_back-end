import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateStatusUserUseCase } from "./UpdateStatusUserUseCase";

class UpdateStatusUserController{

    async updateStatus(request: Request, response: Response): Promise<Response>{
        const { id, active } = request.body;
        const updateStatusUserUseCase = container.resolve(UpdateStatusUserUseCase);
        await updateStatusUserUseCase.updateStatus(id, active);

        return response.status(200).json({ message: "Status atualizado com sucesso!" });
    }
}

export { UpdateStatusUserController }