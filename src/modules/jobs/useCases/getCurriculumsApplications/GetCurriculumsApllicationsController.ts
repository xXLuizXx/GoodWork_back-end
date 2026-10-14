import { Request, Response } from "express";
import { sendStoredFile } from "../../../../utils/sendStoredFile";

class GetCurriculumsApllicationsController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;

        await sendStoredFile(response, filename, "curriculums/curriculums_applications", "Curriculo não encontrado");
    }
}

export { GetCurriculumsApllicationsController }
