import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreatedCategoryDTO } from "../../../repositories/ICategoriesRepository";
import { Brackets, getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    
    constructor(){
        this.repository = getRepository(Category);
    }
    
    async create({name, description, user_id} : ICreatedCategoryDTO): Promise<void>{
        const category = this.repository.create({
            name,
            description,
            user_id
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
            .leftJoinAndSelect('category.user', 'user')
            .select(["category.id",
                "category.name",
                "category.description",
                "category.valid_category",
                "category.created_at",
                "category.user_id",
                "user.name",
                "user.avatar"])
            .where('valid_category IS NULL')
            .getMany();

        return categories;
    }

    async aproveCategorie(id: string, aprove: boolean): Promise<void>{
        await this.repository.createQueryBuilder("category").
            update('categories')
            .set({
                valid_category: aprove
            })
            .where("id = :id", { id })
            .execute();
    }

    async listAllCategories(): Promise<Category[]>{
        const categories = await this.repository.createQueryBuilder('category')
            .leftJoinAndSelect('category.user', 'user')
            .select(["category.id",
                "category.name",
                "category.description",
                "category.valid_category",
                "category.created_at",
                "category.user_id",
                "user.name",
                "user.avatar"])
            .getMany();

        return categories;
    }

    async searchCategories(search: string, status: boolean | null): Promise<Category[]> {
        const queryBuilder = this.repository.createQueryBuilder('category')
            .leftJoinAndSelect('category.user', 'user')
            .select([
                "category.id",
                "category.name", 
                "category.description",
                "category.valid_category",
                "category.created_at",
                "category.user_id",
                "user.name",
                "user.avatar"
            ]);


        if (status !== null) {
            queryBuilder.where("category.valid_category = :status", { status });
        } 

        else if (search) {
            queryBuilder.where(new Brackets(qb => {
                qb.where("category.name LIKE :search", { search: `%${search}%` })
                .orWhere("category.description LIKE :search", { search: `%${search}%` })
                .orWhere("user.name LIKE :search", { search: `%${search}%` });
            }));
        }

        return queryBuilder.getMany();
    }
}

export { CategoriesRepository };