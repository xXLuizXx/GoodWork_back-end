import { Router } from "express";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";

import { CreateInterviewApplicationJobController } from "../../../../modules/jobs/useCases/createInterviewApplicationJob/CreateInterviewApplicationJobController";
import { GetInterviewApplicationJobController } from "../../../../modules/jobs/useCases/getInterviewApplicationJob/GetInterviewApplicationJobController";
import { GetAllInterviewApplicationJobController } from "../../../../modules/jobs/useCases/getAllInterviewApplicationJob/GetAllInterviewApplicationJobController";
import { RescheduleInterviewController } from "../../../../modules/jobs/useCases/rescheduleInterview/RescheduleInterviewController";
import { CancelInterviewController } from "../../../../modules/jobs/useCases/cancelInterview/CancelInterviewController";
import { GetCandidateInterviewController } from "../../../../modules/jobs/useCases/getCandidateInterview/GetCandidateInterviewController";
import { CompleteInterviewController } from "../../../../modules/jobs/useCases/completeInterview/CompleteInterviewController";

const interviewRoutes = Router();

const createInterviewApplicationJobController = new CreateInterviewApplicationJobController();
const getInterviewApplicationJobController = new GetInterviewApplicationJobController();
const getAllInterviewApplicationJobController = new GetAllInterviewApplicationJobController();
const rescheduleInterviewController = new RescheduleInterviewController();
const cancelInterviewController = new CancelInterviewController();
const getCandidateInterviewController = new GetCandidateInterviewController();
const completeInterviewController = new CompleteInterviewController();

interviewRoutes.post("/", ensureAuthenticated, ensureUserCompany, createInterviewApplicationJobController.createInterviewApplicationJob);
interviewRoutes.post("/searchInterview", ensureAuthenticated, ensureUserCompany, getInterviewApplicationJobController.getInterviewApplicationJob);
interviewRoutes.get("/searchAllInterview", ensureAuthenticated, ensureUserCompany, getAllInterviewApplicationJobController.getAllInterviewApplicationJob);
interviewRoutes.patch("/rescheduleInterview", ensureAuthenticated, ensureUserCompany, rescheduleInterviewController.rescheduleInterview);
interviewRoutes.patch("/cancelInterview", ensureAuthenticated, ensureUserCompany, cancelInterviewController.cancelInterview);
interviewRoutes.patch("/completeInterview", ensureAuthenticated, ensureUserCompany, completeInterviewController.completeInterview);
interviewRoutes.get("/myInterview", ensureAuthenticated, getCandidateInterviewController.getCandidateInterview);
export { interviewRoutes }