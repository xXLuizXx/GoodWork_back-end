import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/jobs/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/jobs/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/jobs/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/jobs/repositories/ISpecificationsRepository";
import { IJobsRepository } from "../../modules/jobs/repositories/IJobsRepository";
import { JobsRepository } from "../../modules/jobs/infra/typeorm/repositories/JobsRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IJobsRepository>("JobsRepository", JobsRepository);
