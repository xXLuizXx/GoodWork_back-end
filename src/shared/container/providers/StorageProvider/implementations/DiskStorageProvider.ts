import fs from "fs";
import crypto from "crypto";
import { basename, extname, resolve } from "path";
import { tmpFolder } from "../../../../../config/upload";
import { IStorageProvider, IStoredFile, StorageFolder } from "../IStorageProvider";

class DiskStorageProvider implements IStorageProvider {
    async save(file: string): Promise<string> {
        // O multer já grava o arquivo em tmp/<folder>, nada a fazer
        return file;
    }

    async delete(file: string, folder: StorageFolder): Promise<void> {
        const filePath = this.resolvePath(file, folder);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }

    async copy(file: string, from: StorageFolder, to: StorageFolder): Promise<string> {
        const newFile = `${crypto.randomBytes(16).toString("hex")}${extname(basename(file))}`;

        await fs.promises.copyFile(this.resolvePath(file, from), this.resolvePath(newFile, to));

        return newFile;
    }

    async getFile(file: string, folder: StorageFolder): Promise<IStoredFile | null> {
        const filePath = this.resolvePath(file, folder);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        return { kind: "local", path: filePath };
    }

    private resolvePath(file: string, folder: StorageFolder): string {
        // basename impede path traversal via parâmetro de rota
        return resolve(tmpFolder, folder, basename(file));
    }
}

export { DiskStorageProvider };
