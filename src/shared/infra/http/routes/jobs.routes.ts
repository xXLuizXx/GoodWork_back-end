import { Router } from "express";
import { CreateJobController } from "../../../../modules/jobs/useCases/createJob/CreateJobController";

const jobsRoutes = Router();
const createJobsController = new CreateJobController
jobsRoutes.post("/", createJobsController.handle)
export { jobsRoutes }