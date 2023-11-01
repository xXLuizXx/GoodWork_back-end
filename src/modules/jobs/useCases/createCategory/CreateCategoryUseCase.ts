//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
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async execute({name, description}: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExist){
            throw new AppError("Category already exists!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };