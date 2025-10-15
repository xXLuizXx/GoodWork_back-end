import { Router } from "express"; 
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { ensureUserCompany } from "../../../../shared/infra/http/middlewares/ensureUserCompany";
import { ensureAdmin } from "../../../../shared/infra/http/middlewares/ensureAdmin";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { ListUsersForCompanyController } from "../../../../modules/accounts/useCases/listUsers/ListUsersForCompanyController";
import { ListUsersForStringController } from "../../../../modules/accounts/useCases/listUsersForString/ListUsersForStringController";
import { UpdateStatusUserController } from "../../../../modules/accounts/useCases/updateStatusUser/UpdateStatusUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController;
const updateUserAvatarController = new UpdateUserAvatarController;
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const getProfilleUser = new ProfileUserController;
const updateDataProfileUser = new ProfileUserController;
const uploadCurriculum = multer(uploadConfig.upload("./tmp/curriculums/curriculums_user_profile"));
const listUsersForCompanyController = new ListUsersForCompanyController;
const listUsersForStringController = new ListUsersForStringController;
const updateStatusUserController = new UpdateStatusUserController;

usersRoutes.post("/", uploadCurriculum.single("curriculum"), createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", ensureAuthenticated, getProfilleUser.handle);
usersRoutes.patch("/profile/updateData", ensureAuthenticated, updateDataProfileUser.updateDataProfileUser);
usersRoutes.post("/getAllUsers", ensureAuthenticated, ensureUserCompany, listUsersForCompanyController.listAllUsersForCompany);
usersRoutes.post("/getAllUsersSearch", ensureAuthenticated, ensureUserCompany, listUsersForStringController.listAllUsersSearch);
usersRoutes.patch("/updateStatusUser", ensureAuthenticated, ensureAdmin, updateStatusUserController.updateStatus);

export { usersRoutes }