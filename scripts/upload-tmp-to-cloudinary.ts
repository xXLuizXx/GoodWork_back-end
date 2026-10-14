// Envia os arquivos existentes em tmp/ para o Cloudinary sem apagar as cópias locais.
// Uso: npx ts-node --transpile-only scripts/upload-tmp-to-cloudinary.ts
import "dotenv/config";
import fs from "fs";
import os from "os";
import { resolve } from "path";
import { tmpFolder } from "../src/config/upload";
import { StorageFolder } from "../src/shared/container/providers/StorageProvider/IStorageProvider";
import { CloudinaryStorageProvider } from "../src/shared/container/providers/StorageProvider/implementations/CloudinaryStorageProvider";

const folders: StorageFolder[] = [
    "avatar",
    "banners",
    "curriculums/curriculums_user_profile",
    "curriculums/curriculums_applications",
];

(async () => {
    const provider = new CloudinaryStorageProvider();
    const backupDir = fs.mkdtempSync(resolve(os.tmpdir(), "goodwork-upload-"));
    let ok = 0;
    let failed = 0;

    for (const folder of folders) {
        const dir = resolve(tmpFolder, folder);
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir).filter((file) => fs.statSync(resolve(dir, file)).isFile());

        for (const file of files) {
            const localPath = resolve(dir, file);
            const backupPath = resolve(backupDir, file);

            // save() remove o arquivo local após o envio; guardamos uma cópia para restaurar
            fs.copyFileSync(localPath, backupPath);

            try {
                await provider.save(file, folder);
                ok++;
                console.log(`OK    ${folder}/${file}`);
            } catch (error: any) {
                failed++;
                console.log(`ERRO  ${folder}/${file}: ${error.message || JSON.stringify(error)}`);
            } finally {
                fs.copyFileSync(backupPath, localPath);
                fs.unlinkSync(backupPath);
            }
        }
    }

    fs.rmdirSync(backupDir);
    console.log(`\nEnviados: ${ok} | Falhas: ${failed}`);
})();
