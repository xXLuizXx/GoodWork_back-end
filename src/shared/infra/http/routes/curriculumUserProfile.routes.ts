import { Router } from "express";
import { ensureAuthenticated } from "../../http/middlewares/ensureAuthenticated";
import { GetCurriculumsApllicationsController } from "../../../../modules/jobs/useCases/getCurriculumsApplications/GetCurriculumsApllicationsController";

const curricullumUserProfileRoutes = Router();

const getCurriculumsApllicationsController = new GetCurriculumsApllicationsController();

curricullumUserProfileRoutes.get("/:filename", getCurriculumsApllicationsController.handle);

export { curricullumUserProfileRoutes };