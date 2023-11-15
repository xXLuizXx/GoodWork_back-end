import { Router } from "express";
import { CreateJobController } from "../../../../modules/jobs/useCases/createJob/CreateJobController";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";

const jobsRoutes = Router();
const createJobsController = new CreateJobController
jobsRoutes.post("/", ensureAuthenticated, ensureAdmin, createJobsController.handle)
export { jobsRoutes }