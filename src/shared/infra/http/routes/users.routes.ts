import { Router } from "express"; 
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController;
const updateUserAvatarController = new UpdateUserAvatarController;
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const getProfilleUser = new ProfileUserController;
const updateDataProfileUser = new ProfileUserController;
const uploadCurriculum = multer(uploadConfig.upload("./tmp/curriculums"));

usersRoutes.post("/", uploadCurriculum.single("curriculum"), createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", ensureAuthenticated, getProfilleUser.handle);
usersRoutes.patch("/profile/updateData", ensureAuthenticated, updateDataProfileUser.updateDataProfileUser);

export { usersRoutes }