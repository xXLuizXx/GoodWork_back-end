import { Request, Response } from "express";
import { sendStoredFile } from "../../../../utils/sendStoredFile";

class GetUserAvatarController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;

        await sendStoredFile(response, filename, "avatar", "Avatar não encontrado");
    }
}

export { GetUserAvatarController }
