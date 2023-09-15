import { request, Router } from "express";
import { CreateSpecificationController } from "../modules/empregos/useCases/createSpecification/CreateSpecificationController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes }