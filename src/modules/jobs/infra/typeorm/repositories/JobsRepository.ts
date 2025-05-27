import { Repository, getRepository } from "typeorm";
import { IJobsRepository } from "../../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../entities/Job";
import { ICreateJobsDTO } from "modules/jobs/dtos/ICreateJobsDTO";

class JobsRepository implements IJobsRepository{
    private repository : Repository<Job>;

    constructor(){
        this.repository = getRepository(Job);
    }
    async create({vacancy, contractor, description_vacancy, requirements, workload, location, benefits, banner, category_id, user_id, amount_vacancy, closing_date }: ICreateJobsDTO): Promise<Job> {
        const job = this.repository.create({
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
        
        await this.repository.save(job);
        return job;
    }

    async list(): Promise<Job[]>{
        const job = await this.repository.createQueryBuilder('job')
            .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name"
            ]).where('job.valid_vacancy = true')
            .getMany();

        return job;
    }

    async listByCategory(category_id: string): Promise<Job[]> {
        const jobs = await this.repository.createQueryBuilder('job')
            .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.vacancy_available",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name"
            ])
            .where('job.category_id = :category_id', { category_id }).andWhere('job.valid_vacancy = true')
            .getMany();

        return jobs;
    }

    async findByVacancy(vacancy: string): Promise<Job[]>{
        const jobs = await this.repository.createQueryBuilder('job')
            .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.vacancy_available",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name"
            ])
            .where('LOWER(job.vacancy) LIKE LOWER(:vacancy)', { vacancy: `%${vacancy}%` }).andWhere('job.valid_vacancy = true')
            .getMany();

        return jobs;
    }

    async findVacancysNotValidated(): Promise<number> {
        const count = await this.repository.createQueryBuilder('job')
            .select('job')
            .where('valid_vacancy IS NULL')
            .getCount();
    
        return count;
    }

    async listVacancyNotValidated(): Promise<Job[]>{
        const jobs = await this.repository.createQueryBuilder('job')
            .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name"
            ]).where('job.valid_vacancy IS NULL')
            .getMany();

            return jobs;
    }

    async findById(id: string): Promise<Job> {
        const job = await this.repository
            .createQueryBuilder("job")
            .select('job')
            .where("id = :id", { id })
            .getOne();

        return job;
    }

    async aproveJob(id: string, valid: boolean): Promise<boolean> {
        const result = await this.repository.createQueryBuilder("job")
            .update('jobs')
            .set({ valid_vacancy: valid })
            .where("id = :id", { id })
            .execute();

        return result.affected > 0;
    }

    async allJobsCompany(id: string): Promise<Job[]>{
        const jobs = await this.repository.createQueryBuilder("job")
            .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name",
                "job.vacancy_available",
                "job.created_at"
            ])
            .where('job.user_id = :id', { id }).andWhere("job.valid_vacancy = true")
            .getMany();

        return jobs;
    }

    async getJob(id: string): Promise<Job>{
        const job = await this.repository.createQueryBuilder("job")
        .leftJoinAndSelect('job.user', 'user')
            .select([
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.description_vacancy",
                "job.requirements",
                "job.workload",
                "job.location",
                "job.benefits",
                "job.banner",
                "job.valid_vacancy",
                "job.amount_vacancy",
                "job.closing_date",
                "job.category_id",
                "job.user_id",
                "user.name",
                "job.vacancy_available",
                "job.created_at"
            ])
            .where('job.id = :id', { id }).andWhere("job.valid_vacancy = true")
            .getOne();

            return job;
    }

    async updateJob(id: string, job: Job): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update('jobs')
            .set({
                vacancy: job.vacancy,
                contractor: job.contractor,
                description_vacancy: job.description_vacancy,
                requirements: job.requirements,
                workload: job.workload,
                location: job.location,
                benefits: job.benefits,
                banner: job.banner,
                amount_vacancy: job.amount_vacancy,
                closing_date: () => `TO_TIMESTAMP('${job.closing_date}', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`,
                category_id: job.category_id,
                vacancy_available: job.vacancy_available
            })
            .where("id = :id", { id })
            .execute();
    }

    async closeOrOpen(id: string, valid: boolean): Promise<void>{
        await this.repository
            .createQueryBuilder()
            .update("jobs")
            .set({vacancy_available: valid})
            .where("id = :id",{id})
            .execute();
    }
}

export { JobsRepository }