import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreatedCategoryDTO } from "../../../repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    
    constructor(){
        this.repository = getRepository(Category);
    }
    
    async create({name, description} : ICreatedCategoryDTO): Promise<void>{
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]>{
        const categories = await this.repository.createQueryBuilder('category')
        .select([
            'category.id',
            'category.name',
            'category.description'
        ])
    .where("category.valid_category = :valid", { valid: true })
    .getMany();

        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category;
    }

    async getCategoriesNotValidated(): Promise<Category[]>{
        const categories = await this.repository.createQueryBuilder('category')
            .select('category')
            .where('valid_category IS NULL')
            .getMany();

        return categories;
    }
}

export { CategoriesRepository };