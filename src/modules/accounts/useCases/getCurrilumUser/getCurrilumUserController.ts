import { Request, Response } from "express";
import { resolve } from "path";
import fs from "fs";

class getCurrilumUserController{
    async handle(request: Request, response: Response): Promise<void> {
        console.log("Entrando no cotroller");
        const { filename } = request.params;
        const curricullumDir = resolve(__dirname, "..","..","..","..","..", "tmp", "curriculums", "curriculums_user_profile");

        const filePath = resolve(curricullumDir, filename);

        if (!fs.existsSync(filePath)) {
            response.status(404).send("Curriulo não encontrado");
            return;
        }

        response.setHeader("Cache-Control", "public, max-age=86400");
        response.sendFile(filePath);
    }
}

export { getCurrilumUserController }