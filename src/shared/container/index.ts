import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/empregos/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/empregos/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/empregos/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/empregos/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
