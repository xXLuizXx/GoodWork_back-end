import { Category } from '../infra/typeorm/entities/Category';

interface ICreatedCategoryDTO{
    name: string;
    description: string;
    user_id: string;
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description, user_id}: ICreatedCategoryDTO): Promise<void>;
    getCategoriesNotValidated(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreatedCategoryDTO };