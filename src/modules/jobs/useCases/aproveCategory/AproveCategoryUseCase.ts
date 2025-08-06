import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AproveCategoryUseCase{
    constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoriesRepository){};

    async execute(id: string, aprove: boolean): Promise<void> {
        const aproveCategory = await this.categoriesRepository.aproveCategorie(id, aprove);
        
        return aproveCategory;
    }
}

export { AproveCategoryUseCase }