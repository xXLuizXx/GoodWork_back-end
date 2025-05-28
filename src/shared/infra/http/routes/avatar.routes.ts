import { Router } from "express";
import { ensureAuthenticated } from "../../http/middlewares/ensureAuthenticated";
import { GetUserAvatarController } from "../../../../modules/accounts/useCases/getUserAvatar/GetUserAvatarController";

const avatarRoutes = Router();

const getAvatarController = new GetUserAvatarController();

avatarRoutes.get("/:filename", getAvatarController.handle);

export { avatarRoutes };