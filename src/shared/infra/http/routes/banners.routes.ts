import { Router } from "express";
import { ensureAuthenticated } from "../../http/middlewares/ensureAuthenticated";
import { ServeBannerController } from "../../../../modules/banners/useCases/BannersController";

const bannersRoutes = Router();

const serveBannerController = new ServeBannerController();

bannersRoutes.get("/:filename", serveBannerController.handle);

export { bannersRoutes };