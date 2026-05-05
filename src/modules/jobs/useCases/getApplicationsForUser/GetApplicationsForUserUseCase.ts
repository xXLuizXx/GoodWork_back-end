import { injectable, inject } from "tsyringe";
import { Application } from "../../../../modules/jobs/infra/typeorm/entities/Application";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";

@injectable()
class GetApplicationsForUserUseCase {

    constructor(
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
    ){}

    async execute(user_id: string): Promise<Application[]>{
        return await this.applicationRepository.findApplicationsByUser(user_id);
    }
}

export { GetApplicationsForUserUseCase }
