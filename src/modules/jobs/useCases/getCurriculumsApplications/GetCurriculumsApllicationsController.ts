import { Request, Response } from "express";
import { resolve } from "path";
import fs from "fs";

class GetCurriculumsApllicationsController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;
        const currcullumDir = resolve(__dirname, "..","..","..","..","..", "tmp", "curriculums", "curriculums_applications");

        const filePath = resolve(currcullumDir, filename);

        if (!fs.existsSync(filePath)) {
            response.status(404).send("Curriculo não encontrado");
            return;
        }

        response.setHeader("Cache-Control", "public, max-age=86400");
        response.sendFile(filePath);
    }
}

export { GetCurriculumsApllicationsController }