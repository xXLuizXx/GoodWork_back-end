import { Router } from "express";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import { CreateApplicationJobController } from "../../../../modules/jobs/useCases/createApplication/CreateApplicationJobController";
import { ListApplicationVacancyCompanyController } from "../../../../modules/jobs/useCases/listApplicationVacancyCompany/ListApplicationVacancyCompanyController";
import { AproveApplicationsVacancyController } from "../../../../modules/jobs/useCases/aproveApplications/AproveApplicationsVacancyController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

const applicationRoutes = Router();
const createAppliationJobController = new CreateApplicationJobController;
const listApplicationVacancyCompanyController = new ListApplicationVacancyCompanyController;
const aproveApplicationsVacancyController = new AproveApplicationsVacancyController;
const uploadCurriculum = multer(uploadConfig.upload("./tmp/curriculums/curriculums_applications"));

applicationRoutes.post("/", ensureAuthenticated, uploadCurriculum.single("curriculum_user"), createAppliationJobController.createApplication);
applicationRoutes.get("/getApplications", ensureAuthenticated, ensureUserCompany, listApplicationVacancyCompanyController.getAllApplicationsJob);
applicationRoutes.patch("/finalizeApplications", ensureAuthenticated, ensureUserCompany, aproveApplicationsVacancyController.aproveAppliations);

export { applicationRoutes }