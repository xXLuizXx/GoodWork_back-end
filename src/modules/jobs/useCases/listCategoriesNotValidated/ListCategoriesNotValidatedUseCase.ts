import { CategoriesRepository } from "../../../../modules/jobs/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../../../modules/jobs/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface ICategory {
    name: string;
    description: string;
    valid_category: boolean;
}

@injectable()
class ListCategoriesNotValidatedUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepositore: ICategoriesRepository){};

    async getCategories():Promise<ICategory[]>{
        const categories = await this.categoriesRepositore.getCategoriesNotValidated()

        return categories;
    }
}

export { ListCategoriesNotValidatedUseCase }