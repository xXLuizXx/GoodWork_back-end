import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default {
    upload(folder: string) {
        const isDocument = folder.includes("curriculum");
        const allowedTypes = isDocument ? ALLOWED_DOCUMENT_TYPES : ALLOWED_IMAGE_TYPES;

        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (_request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const ext = file.originalname.split(".").pop();
                    const fileName = `${fileHash}.${ext}`;
                    return callback(null, fileName);
                },
            }),
            limits: { fileSize: MAX_FILE_SIZE },
            fileFilter: (_request: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
                if (!allowedTypes.includes(file.mimetype)) {
                    return callback(new Error(`Tipo de arquivo não permitido. Permitidos: ${allowedTypes.join(", ")}`));
                }
                return callback(null, true);
            },
        };
    },
};
