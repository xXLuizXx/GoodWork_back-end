import { Router } from "express";
import { getCurrilumUserController } from "../../../../modules/accounts/useCases/getCurrilumUser/getCurrilumUserController";

const curricullumUserProfileRoutes = Router();

const getCurriculumUserController = new getCurrilumUserController();

curricullumUserProfileRoutes.get("/:filename", getCurriculumUserController.handle);

export { curricullumUserProfileRoutes };
