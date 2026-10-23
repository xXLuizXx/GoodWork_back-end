import { Router } from "express";
import multer from "multer";
import { SendMailController } from "../../../../modules/mailtrap/useCases/sendMail/SendMailController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";

const sendMailRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/mail"));

const sendMailController = new SendMailController;

// Só empresas logadas enviam e-mails: sem isso, qualquer um usaria a conta de envio da plataforma
sendMailRoutes.post("/", ensureAuthenticated, ensureUserCompany, upload.single("file"), sendMailController.handle);
sendMailRoutes.post("/batch-rejections", ensureAuthenticated, ensureUserCompany, sendMailController.reject);

export { sendMailRoutes };