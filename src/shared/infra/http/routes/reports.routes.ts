import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import { GetAdminOverviewController } from "../../../../modules/jobs/useCases/reports/GetAdminOverviewController";
import { GetAdminJobsByCategoryController } from "../../../../modules/jobs/useCases/reports/GetAdminJobsByCategoryController";
import { GetCompanyOverviewController } from "../../../../modules/jobs/useCases/reports/GetCompanyOverviewController";
import { GetCompanyFunnelController } from "../../../../modules/jobs/useCases/reports/GetCompanyFunnelController";
import { GetIndividualOverviewController } from "../../../../modules/jobs/useCases/reports/GetIndividualOverviewController";

const reportsRoutes = Router();

const getAdminOverviewController = new GetAdminOverviewController();
const getAdminJobsByCategoryController = new GetAdminJobsByCategoryController();
const getCompanyOverviewController = new GetCompanyOverviewController();
const getCompanyFunnelController = new GetCompanyFunnelController();
const getIndividualOverviewController = new GetIndividualOverviewController();

reportsRoutes.get("/admin/overview", ensureAuthenticated, ensureAdmin, getAdminOverviewController.handle);
reportsRoutes.get("/admin/jobs-by-category", ensureAuthenticated, ensureAdmin, getAdminJobsByCategoryController.handle);
reportsRoutes.get("/company/overview", ensureAuthenticated, ensureUserCompany, getCompanyOverviewController.handle);
reportsRoutes.get("/company/funnel", ensureAuthenticated, ensureUserCompany, getCompanyFunnelController.handle);
reportsRoutes.get("/individual/overview", ensureAuthenticated, getIndividualOverviewController.handle);

export { reportsRoutes };
