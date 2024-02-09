import { Specification } from "../infra/typeorm/entities/Specification";

interface IcreateSpecificationDTO{
    name: string,
    description: string
}

interface ISpecificationsRepository{
    create({name, description}: IcreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, IcreateSpecificationDTO };