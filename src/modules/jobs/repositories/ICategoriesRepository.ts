import { Category } from '../infra/typeorm/entities/Category';

interface ICreatedCategoryDTO{
    name: string;
    description: string;
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description}: ICreatedCategoryDTO): Promise<void>;
    getCategoriesNotValidated(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreatedCategoryDTO };