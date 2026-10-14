import fs from "fs";
import { basename, extname, resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import { tmpFolder } from "../../../../../config/upload";
import { IStorageProvider, IStoredFile, StorageFolder } from "../IStorageProvider";

type ResourceType = "image" | "raw";

class CloudinaryStorageProvider implements IStorageProvider {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    }

    async save(file: string, folder: StorageFolder): Promise<string> {
        const localPath = resolve(tmpFolder, folder, basename(file));
        const { publicId, resourceType } = this.getAsset(file, folder);

        try {
            await cloudinary.uploader.upload(localPath, {
                public_id: publicId,
                resource_type: resourceType,
                overwrite: true,
            });
        } finally {
            await fs.promises.unlink(localPath).catch(() => undefined);
        }

        return file;
    }

    async delete(file: string, folder: StorageFolder): Promise<void> {
        const { publicId, resourceType } = this.getAsset(file, folder);

        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }

    async getFile(file: string, folder: StorageFolder): Promise<IStoredFile | null> {
        const { publicId, resourceType, format } = this.getAsset(file, folder);

        const url = cloudinary.url(publicId, {
            resource_type: resourceType,
            format: resourceType === "image" ? format : undefined,
            secure: true,
            // Sem "/v1/" na URL: o Cloudinary só invalida o cache de URLs sem versão ao sobrescrever um arquivo
            force_version: false,
        });

        return { kind: "remote", url };
    }

    // O banco guarda apenas "<hash>.<ext>"; o public_id é derivado dele para não exigir migration.
    // PDFs vão como "raw" (public_id mantém a extensão); imagens como "image" (formato vai na URL).
    private getAsset(file: string, folder: StorageFolder) {
        const name = basename(file);
        const format = extname(name).replace(".", "").toLowerCase();
        const resourceType: ResourceType = format === "pdf" ? "raw" : "image";
        const id = resourceType === "raw" || !format ? name : name.slice(0, -(format.length + 1));

        return { publicId: `goodwork/${folder}/${id}`, resourceType, format };
    }
}

export { CloudinaryStorageProvider };
