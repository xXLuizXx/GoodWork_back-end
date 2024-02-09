import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { jobsRoutes } from "./jobs.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/jobs", jobsRoutes);
router.use(authenticateRoutes);

export { router }