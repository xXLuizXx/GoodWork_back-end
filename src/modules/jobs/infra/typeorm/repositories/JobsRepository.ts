import { Repository, getRepository } from "typeorm";
import { IJobsRepository } from "../../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../entities/Job";
import { ICreateJobsDTO } from "modules/jobs/dtos/ICreateJobsDTO";

class JobsRepository implements IJobsRepository{
    private repository : Repository<Job>;

    constructor(){
        this.repository = getRepository(Job);
    }
    async create({vacancy, contractor, description_vacancy, requirements, workload, location, benefits, banner, category_id, user_id }: ICreateJobsDTO): Promise<Job> {
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
            user_id
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
                "job.valid_vacancy",
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
                "job.valid_vacancy",
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
                "job.category_id",
                "job.user_id",
                "user.name"
            ]).where('job.valid_vacancy IS NULL')
            .getMany();

            return jobs;
    }
    
}

export { JobsRepository }