import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { jobsRoutes } from "./jobs.routes";
import { applicationRoutes } from "./application.routes";
import { sendMailRoutes } from "./sendMail.routes";
import { bannersRoutes } from "./banners.routes";
import { avatarRoutes } from "./avatar.routes";
import { curricullumApplicationRoutes } from "./curricullumApplication.routes";
import { curricullumUserProfileRoutes } from "./curriculumUserProfile.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/jobs", jobsRoutes);
router.use("/application", applicationRoutes);
router.use("/mail", sendMailRoutes);
router.use("/banners", bannersRoutes);
router.use("/avatars", avatarRoutes);
router.use("/curriculum_application", curricullumApplicationRoutes);
router.use("/curriculum_user_profile", curricullumUserProfileRoutes);
router.use(authenticateRoutes);

export { router }