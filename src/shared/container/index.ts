import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/empregos/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/empregos/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/empregos/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/empregos/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
