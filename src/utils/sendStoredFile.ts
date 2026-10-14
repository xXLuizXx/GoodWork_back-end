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

    response.setHeader("Cache-Control", "public, max-age=86400");

    if (file.kind === "remote") {
        response.redirect(file.url);
        return;
    }

    response.sendFile(file.path);
};
