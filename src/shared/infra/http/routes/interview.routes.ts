import { Router } from "express";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import multer from "multer";
import { CreateInterviewApplicationJobController } from "../../../../modules/jobs/useCases/createInterviewApplicationJob/CreateInterviewApplicationJobController";

const interviewRoutes = Router();

const createInterviewApplicationJobController = new CreateInterviewApplicationJobController();

interviewRoutes.post("/", /*ensureAuthenticated, ensureUserCompany,*/ createInterviewApplicationJobController.createInterviewApplicationJob);

export { interviewRoutes }