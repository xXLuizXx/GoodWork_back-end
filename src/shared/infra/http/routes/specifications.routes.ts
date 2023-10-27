import { request, Router } from "express";
import { CreateSpecificationController } from "../../../../modules/jobs/useCases/createSpecification/CreateSpecificationController"
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes }