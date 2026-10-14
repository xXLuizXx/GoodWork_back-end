import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { IStorageProvider, StorageFolder } from "../../../container/providers/StorageProvider/IStorageProvider";

// Usado logo após o multer: envia o arquivo recebido para o storage configurado (disco ou Cloudinary)
export function persistUpload(folder: StorageFolder) {
    return async (request: Request, _response: Response, next: NextFunction) => {
        if (request.file) {
            const storageProvider = container.resolve<IStorageProvider>("StorageProvider");
            await storageProvider.save(request.file.filename, folder);
        }

        return next();
    };
}
