import { Response } from "express";
import { container } from "tsyringe";
import { IStorageProvider, StorageFolder } from "../shared/container/providers/StorageProvider/IStorageProvider";

export const sendStoredFile = async (response: Response, filename: string, folder: StorageFolder, notFoundMessage: string) => {
    const storageProvider = container.resolve<IStorageProvider>("StorageProvider");
    const file = await storageProvider.getFile(filename, folder);

    if (!file) {
        response.status(404).send(notFoundMessage);
        return;
    }

    if (file.kind === "remote") {
        // Cache curto: o destino do redirect pode mudar (ex.: arquivo substituído); o arquivo em si fica em cache no Cloudinary
        response.setHeader("Cache-Control", "public, max-age=300");
        response.redirect(file.url);
        return;
    }

    response.setHeader("Cache-Control", "public, max-age=86400");
    response.sendFile(file.path);
};
