import { transform } from "typescript";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase {
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        
        return categories;
    }

    async listAllCategories(): Promise<Category[]> {
        const categories = await this.categoriesRepository.listAllCategories();
        
        return categories;
    }

    async searchCategories(search: string): Promise<Category[]> {
        let processedSearch = search;
        let statusBoolean: boolean | null = null;

        const searchLower = search.toLowerCase();
        
        if (searchLower === 'ativo' || searchLower === 'inativo') {
            statusBoolean = searchLower === 'ativo';
            processedSearch = ''; 
        }

        const categories = await this.categoriesRepository.searchCategories(
            processedSearch, 
            statusBoolean
        );

        return categories;
    }

}

export { ListCategoriesUseCase };
