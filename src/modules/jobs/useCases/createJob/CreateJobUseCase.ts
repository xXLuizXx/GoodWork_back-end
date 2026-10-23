import { AppError } from "../../../../shared/errors/AppError";
import { IJobsRepository } from "../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../../../../modules/jobs/infra/typeorm/entities/Job";
import { inject, injectable } from "tsyringe"
import { parseDateOnly } from "../../../../utils/dateOnly";
import { NotifyAdminsUseCase } from "../../../notifications/useCases/notifyAdmins/NotifyAdminsUseCase";

interface IRequest {
    vacancy: string;
    contractor: string;
    description_vacancy: string
    requirements: string;
    workload: string;
    location: string;
    benefits: string;
    banner: string;
    category_id: string;
    user_id: string;
    amount_vacancy: number
    closing_date: string;
}


@injectable()
class CreateJobUseCase{

    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository,
        @inject(NotifyAdminsUseCase) private notifyAdmins: NotifyAdminsUseCase
    ) {}

    async execute({ 
        vacancy,
        contractor,
        description_vacancy,
        requirements,
        workload,
        location, 
        benefits,
        banner,
        category_id,
        user_id,
        amount_vacancy,
        closing_date
    }: IRequest): Promise<Job> {
        parseDateOnly(closing_date);

        const job = await this.jobsRepository.create({
            vacancy,
            contractor,
            description_vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id,
            user_id,
            amount_vacancy,
            closing_date
        });

        // A vaga nasce pendente (valid_vacancy = null) até um admin aprovar
        await this.notifyAdmins.execute({
            type: "job_pending_validation",
            title: "Nova vaga para aprovar",
            body: `${contractor || "Uma empresa"} cadastrou a vaga ${vacancy}.`,
            resource_id: job.id,
            resource_type: "job",
        }, user_id);

        return job;
    }
}

export { CreateJobUseCase }