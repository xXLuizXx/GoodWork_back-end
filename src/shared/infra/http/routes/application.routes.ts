import { Router } from "express";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import { CreateApplicationJobController } from "../../../../modules/jobs/useCases/createApplication/CreateApplicationJobController";
import { ListApplicationVacancyCompanyController } from "../../../../modules/jobs/useCases/listApplicationVacancyCompany/ListApplicationVacancyCompanyController";

const applicationRoutes = Router();
const createAppliationJobController = new CreateApplicationJobController;
const listApplicationVacancyCompanyController = new ListApplicationVacancyCompanyController;

applicationRoutes.post("/", createAppliationJobController.createApplication);
applicationRoutes.get("/getApplications", listApplicationVacancyCompanyController.getAllApplicationsJob);

export { applicationRoutes }