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
                "user.name",
                "user.avatar"
            ]).where('job.valid_vacancy = true')
            .andWhere('job.vacancy_available = true')
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
                "user.name",
                "user.avatar"
            ])
            .where('job.category_id = :category_id', { category_id })
            .andWhere('job.valid_vacancy = true')
            .andWhere('job.vacancy_available = true')
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
                "user.name",
                "user.avatar"
            ])
            .where('LOWER(job.vacancy) LIKE LOWER(:vacancy)', { vacancy: `%${vacancy}%` })
            .andWhere('job.valid_vacancy = true')
            .andWhere('job.vacancy_available = true')
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
                "user.name",
                "user.avatar"
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

        return job!;
    }

    async aproveJob(id: string, valid: boolean): Promise<boolean> {
        const result = await this.repository.createQueryBuilder("job")
            .update('jobs')
            .set({ valid_vacancy: valid })
            .where("id = :id", { id })
            .execute();

        return (result.affected ?? 0) > 0;
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
                "user.avatar",
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
                "user.avatar",
                "job.vacancy_available",
                "job.created_at"
            ])
            .where('job.id = :id', { id }).andWhere("job.valid_vacancy = true")
            .getOne();

            return job!;
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

    async listAllJobs(): Promise<Job[]>{
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
                "job.created_at",
                "job.category_id",
                "job.user_id",
                "user.name",
                "user.avatar"
            ])
            .getMany();

        return job;
    }

    async listAllJobsSearch(search: string): Promise<Job[]>{
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
                "job.created_at",
                "job.category_id",
                "job.user_id",
                "user.name",
                "user.avatar"
            ]).where('LOWER(job.vacancy) LIKE LOWER(:vacancy)', { vacancy: `%${search}%` })
            .getMany();

        return job;
    }
    
    async findExpiredVacancies(): Promise<Job[]> {
        return this.repository
            .createQueryBuilder("job")
            .select(["job.id"])
            .where("job.closing_date <= NOW()")
            .andWhere("job.vacancy_available = true")
            .getMany();
    }

    async countJobStats(): Promise<{ total: number; active: number; closed: number; pendingValidation: number }> {
        const total = await this.repository.createQueryBuilder("job")
            .where("job.valid_vacancy = true")
            .getCount();

        const active = await this.repository.createQueryBuilder("job")
            .where("job.valid_vacancy = true")
            .andWhere("job.vacancy_available = true")
            .getCount();

        const closed = await this.repository.createQueryBuilder("job")
            .where("job.valid_vacancy = true")
            .andWhere("job.vacancy_available = false")
            .getCount();

        const pendingValidation = await this.repository.createQueryBuilder("job")
            .where("job.valid_vacancy IS NULL")
            .getCount();

        return { total, active, closed, pendingValidation };
    }

    async countJobsByCategory(): Promise<{ label: string; value: number }[]> {
        const result = await this.repository.createQueryBuilder("job")
            .leftJoin("job.category", "category")
            .select("category.name", "label")
            .addSelect("COUNT(job.id)", "value")
            .where("job.valid_vacancy = true")
            .groupBy("category.name")
            .getRawMany();

        return result.map(r => ({ label: r.label, value: Number(r.value) }));
    }

    async getCompanyJobsStats(company_id: string): Promise<{ total: number; active: number; closed: number; avgDays: number }> {
        const jobs = await this.repository.createQueryBuilder("job")
            .select(["job.vacancy_available", "job.created_at", "job.closing_date"])
            .where("job.user_id = :company_id", { company_id })
            .andWhere("job.valid_vacancy = true")
            .getMany();

        const total = jobs.length;
        const active = jobs.filter(j => j.vacancy_available).length;
        const closed = jobs.filter(j => !j.vacancy_available).length;

        const avgDays = total > 0
            ? Math.round(jobs.reduce((acc, j) => {
                const diff = (new Date(j.closing_date).getTime() - new Date(j.created_at).getTime()) / (1000 * 60 * 60 * 24);
                return acc + diff;
            }, 0) / total)
            : 0;

        return { total, active, closed, avgDays };
    }

}

export { JobsRepository }