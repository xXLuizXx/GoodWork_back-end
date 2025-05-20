import { Router } from "express";
import multer from "multer";
import { SendMailController } from "../../../../modules/mailtrap/useCases/sendMail/SendMailController";
import uploadConfig from "../../../../config/upload";

const sendMailRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/mail"));

const sendMailController = new SendMailController();

sendMailRoutes.post("/", upload.single("file"), sendMailController.handle);

export { sendMailRoutes };