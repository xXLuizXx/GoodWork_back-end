import { Router } from "express";
import { ensureAuthenticated } from "../../http/middlewares/ensureAuthenticated";
import { GetCurriculumsApllicationsController } from "../../../../modules/jobs/useCases/getCurriculumsApplications/GetCurriculumsApllicationsController";

const curricullumApplicationRoutes = Router();

const getCurriculumsApllicationsController = new GetCurriculumsApllicationsController();

curricullumApplicationRoutes.get("/:filename", getCurriculumsApllicationsController.handle);

export { curricullumApplicationRoutes };