// src/modules/banners/useCases/serveBanner/ServeBannerController.ts
import { Request, Response } from "express";
import { resolve } from "path";
import fs from "fs";

class ServeBannerController {
    async handle(request: Request, response: Response): Promise<void> {
        const { filename } = request.params;
        const bannersDir = resolve(__dirname, "..", "..", "..", "..", "tmp", "banners");
        const filePath = resolve(bannersDir, filename);

        if (!fs.existsSync(filePath)) {
            response.status(404).send("Banner não encontrado");
            return;
        }

        response.setHeader("Cache-Control", "public, max-age=86400");
        response.sendFile(filePath);
    }
}

export { ServeBannerController };