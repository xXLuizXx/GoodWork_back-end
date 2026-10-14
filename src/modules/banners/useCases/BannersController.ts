import { Request, Response } from "express";
import { sendStoredFile } from "../../../utils/sendStoredFile";

class ServeBannerController{
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;

        await sendStoredFile(response, filename, "banners", "Banner não encontrado");
    }
}

export { ServeBannerController }
