import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";
import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(@inject(SpecificationsRepository) private specificationsRepository: ISpecificationsRepository) {}

    async execute({name, description}: IRequest): Promise<void> {
        const specificationAlReadyExist = await this.specificationsRepository.findByName(name);
        if(specificationAlReadyExist){
            throw new AppError("Specifications already exists!");
        }
        await this.specificationsRepository.create({name, description});
    }
}

export { CreateSpecificationUseCase };