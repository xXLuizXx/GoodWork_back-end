import { Router } from "express";
import { CreateJobController } from "../../../../modules/jobs/useCases/createJob/CreateJobController";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";
import { ListJobsController } from "../../../../modules/jobs/useCases/listJobs/ListJobsController";
import { AproveJobsController } from "../../../../modules/jobs/useCases/aproveJobs/AproveJobsController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import { CloseOrOpenVacancyController } from "../../../../modules/jobs/useCases/closeVacancy/CloseOrOpenVacancyController";

const jobsRoutes = Router();
const createJobsController = new CreateJobController;
const listJobsController = new ListJobsController;
const closeOrOpenVacancyController = new CloseOrOpenVacancyController;
const uploadBanner = multer(uploadConfig.upload("./tmp/banners"));
const aproveJobController = new AproveJobsController;



jobsRoutes.post("/", ensureAuthenticated,  uploadBanner.single("banner"), createJobsController.handle);
jobsRoutes.get("/list", ensureAuthenticated, listJobsController.handler);
jobsRoutes.get("/listCategories", ensureAuthenticated, listJobsController.listJobsCategories);
jobsRoutes.get("/listVacancy", ensureAuthenticated, listJobsController.listJobsVacancy);
jobsRoutes.get("/countVacancyNotValidated", ensureAuthenticated, listJobsController.countJobsVacancyNotValidated);
jobsRoutes.get("/listVacancyNotValidated", ensureAuthenticated, listJobsController.listJobsVacancyNotValidated);
jobsRoutes.patch("/aproveJob", ensureAuthenticated, ensureAdmin, aproveJobController.aproveJob);
jobsRoutes.get("/listJobsCompany",ensureAuthenticated, ensureUserCompany, listJobsController.getAllJobsCompany);
jobsRoutes.get("/getJob",ensureAuthenticated, ensureUserCompany, listJobsController.getJob);
jobsRoutes.patch("/updateJob", ensureAuthenticated, ensureUserCompany, uploadBanner.single("banner"), listJobsController.updateJob);
jobsRoutes.patch("/updateStatusJob",ensureAuthenticated, ensureAuthenticated, closeOrOpenVacancyController.closeOrOpenVacancy);
export { jobsRoutes }