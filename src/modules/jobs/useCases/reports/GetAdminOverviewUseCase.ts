import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IJobsRepository } from "../../repositories/IJobsRepository";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";

@injectable()
class GetAdminOverviewUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("JobsRepository") private jobsRepository: IJobsRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository
    ) {}

    async execute() {
        const [users, jobs, applications] = await Promise.all([
            this.usersRepository.countByType(),
            this.jobsRepository.countJobStats(),
            this.applicationRepository.countApplicationStats(),
        ]);

        return { users, jobs, applications };
    }
}

export { GetAdminOverviewUseCase };
