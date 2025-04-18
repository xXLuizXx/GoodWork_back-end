import { Router } from "express";
import { CreateJobController } from "../../../../modules/jobs/useCases/createJob/CreateJobController";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";
import { ListJobsController } from "../../../../modules/jobs/useCases/listJobs/ListJobsController";
import { AproveJobsController } from "../../../../modules/jobs/useCases/aproveJobs/AproveJobsController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

const jobsRoutes = Router();
const createJobsController = new CreateJobController;
const listJobsController = new ListJobsController;
const uploadBanner = multer(uploadConfig.upload("./tmp/banners"));
const aproveJobController = new AproveJobsController;

jobsRoutes.post("/", ensureAuthenticated,  uploadBanner.single("banner"), createJobsController.handle);
jobsRoutes.get("/list", ensureAuthenticated, listJobsController.handler);
jobsRoutes.get("/listCategories", ensureAuthenticated, listJobsController.listJobsCategories);
jobsRoutes.get("/listVacancy", ensureAuthenticated, listJobsController.listJobsVacancy);
jobsRoutes.get("/countVacancyNotValidated", ensureAuthenticated, listJobsController.countJobsVacancyNotValidated);
jobsRoutes.get("/listVacancyNotValidated", ensureAuthenticated, listJobsController.listJobsVacancyNotValidated);
jobsRoutes.patch("/aproveJob", ensureAuthenticated, ensureAdmin, aproveJobController.aproveJob);
export { jobsRoutes }