import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureUserCompany } from "../middlewares/ensureUserCompany";
import { GetAdminOverviewController } from "../../../../modules/reports/useCases/getAdminOverview/GetAdminOverviewController";
import { GetAdminJobsByCategoryController } from "../../../../modules/reports/useCases/getAdminJobsByCategory/GetAdminJobsByCategoryController";
import { GetCompanyOverviewController } from "../../../../modules/reports/useCases/getCompanyOverview/GetCompanyOverviewController";
import { GetCompanyFunnelController } from "../../../../modules/reports/useCases/getCompanyFunnel/GetCompanyFunnelController";
import { GetIndividualOverviewController } from "../../../../modules/reports/useCases/getIndividualOverview/GetIndividualOverviewController";

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
