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
import { ListPublicJobsController } from "../../../../modules/jobs/useCases/listPublicJobs/ListPublicJobsController";
import { SearchPublicJobsController } from "../../../../modules/jobs/useCases/searchPublicJobs/SearchPublicJobsController";
import { GetPublicJobController } from "../../../../modules/jobs/useCases/getPublicJob/GetPublicJobController";

const jobsRoutes = Router();
const createJobsController = new CreateJobController;
const listJobsController = new ListJobsController;
const closeOrOpenVacancyController = new CloseOrOpenVacancyController;
const uploadBanner = multer(uploadConfig.upload("./tmp/banners"));
const aproveJobController = new AproveJobsController;
const listPublicJobsController = new ListPublicJobsController;
const searchPublicJobsController = new SearchPublicJobsController;
const getPublicJobController = new GetPublicJobController;

// ── Rotas públicas (sem autenticação) ──────────────────────────────────────
// Ordem obrigatória: /public e /public/search antes de /public/:id
jobsRoutes.get("/public",        listPublicJobsController.handle);
jobsRoutes.get("/public/search", searchPublicJobsController.handle);
jobsRoutes.get("/public/:id",    getPublicJobController.handle);

// ── Rotas autenticadas ─────────────────────────────────────────────────────
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
jobsRoutes.patch("/updateStatusJob", ensureAuthenticated, closeOrOpenVacancyController.closeOrOpenVacancy);
jobsRoutes.get("/listAllJobs", ensureAuthenticated, ensureAdmin, listJobsController.getAllJobs);
jobsRoutes.get("/listForUserLogged", ensureAuthenticated, listJobsController.getAllJobsForUserLogged);
export { jobsRoutes }