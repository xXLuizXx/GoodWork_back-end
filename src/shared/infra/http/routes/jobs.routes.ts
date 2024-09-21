import { Router } from "express";
import { CreateJobController } from "../../../../modules/jobs/useCases/createJob/CreateJobController";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";
import { ListJobsController } from "../../../../modules/jobs/useCases/listJobs/ListJobsController";

const jobsRoutes = Router();
const createJobsController = new CreateJobController;
const listJobsController = new ListJobsController;
jobsRoutes.post("/", ensureAuthenticated, ensureAdmin, createJobsController.handle);
jobsRoutes.get("/list", ensureAuthenticated, listJobsController.handler);
jobsRoutes.get("/listCategories", ensureAuthenticated, listJobsController.listJobsCategories);
jobsRoutes.get("/listVacancy", listJobsController.listJobsVacancy);
export { jobsRoutes }