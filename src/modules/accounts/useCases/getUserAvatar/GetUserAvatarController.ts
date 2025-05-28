import { Request, Response } from "express";
import { resolve } from "path";
import fs from "fs";

class GetUserAvatarController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;
        const avatarDir = resolve(__dirname, "..","..","..","..","..", "tmp", "avatar");

        const filePath = resolve(avatarDir, filename);

        if (!fs.existsSync(filePath)) {
            response.status(404).send("Avatar não encontrado");
            return;
        }

        response.setHeader("Cache-Control", "public, max-age=86400");
        response.sendFile(filePath);
    }
}

export { GetUserAvatarController }