import "reflect-metadata";
 import { Router } from 'express';
 import { CreateCategoryController } from "../../../../modules/jobs/useCases/createCategory/CreateCategoryController";
 import { ListCategoriesController } from "../../../../modules/jobs/useCases/listCategories/ListCategoriesController";
 import { ImportCategoryController } from "../../../../modules/jobs/useCases/importCategory/ImportCategoryController";
 
 import multer from 'multer';
 import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
 import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAdminOrCompany } from "../middlewares/ensureAdminOrCompany";
import { ListCategoriesNotValidatedController } from "../../../../modules/jobs/useCases/listCategoriesNotValidated/ListCategoriesNotValidatedController";
 
 
 const categoriesRoutes = Router();
 const upload = multer({dest: "./tmp",});
 const createCategoryController = new CreateCategoryController();
 const importCategoryController = new ImportCategoryController();
 const listCategoriesController = new ListCategoriesController();
 const listCategoriesNotValidatedController = new ListCategoriesNotValidatedController();

 categoriesRoutes.post("/", ensureAuthenticated, ensureAdminOrCompany, createCategoryController.handle);
 categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);
 categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importCategoryController.handle);
 categoriesRoutes.get("/categoriesNotValidated", listCategoriesNotValidatedController.getCategoriesNotValidated)
 
 export { categoriesRoutes };