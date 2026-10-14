import { Request, Response } from "express";
import { sendStoredFile } from "../../../../utils/sendStoredFile";

class getCurrilumUserController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;

        await sendStoredFile(response, filename, "curriculums/curriculums_user_profile", "Curriculo não encontrado");
    }
}

export { getCurrilumUserController }
