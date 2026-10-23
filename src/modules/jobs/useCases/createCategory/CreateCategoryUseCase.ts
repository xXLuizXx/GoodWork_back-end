import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { NotifyAdminsUseCase } from "../../../notifications/useCases/notifyAdmins/NotifyAdminsUseCase";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    user_id: string
}

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject(NotifyAdminsUseCase) private notifyAdmins: NotifyAdminsUseCase
    ){}

    async execute({name, description, user_id}: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExist){
            throw new AppError("Category already exists!");
        }

        const creator = await this.usersRepository.findById(user_id);
        const category = await this.categoriesRepository.create({ name, description, user_id});

        // Categoria criada por admin não precisa de aprovação de outro admin
        if (creator?.isAdmin) {
            return;
        }

        await this.notifyAdmins.execute({
            type: "category_pending_validation",
            title: "Nova categoria para aprovar",
            body: `${creator?.name ?? "Uma empresa"} sugeriu a categoria ${name}.`,
            resource_id: category.id,
            resource_type: "category",
        }, user_id);
    }
}

export { CreateCategoryUseCase };
