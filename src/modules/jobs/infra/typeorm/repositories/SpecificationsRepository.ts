import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({ name, description }: IcreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ name });
        return specification;
    }
    
}

export { SpecificationsRepository };