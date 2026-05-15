import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../../jobs/repositories/IApplicationRepository";
import { IInterviewApplicationJobRepository } from "../../../jobs/repositories/IInterviewApplicationJobRepository";
import { IJobsRepository } from "../../../jobs/repositories/IJobsRepository";

@injectable()
class GetCompanyFunnelUseCase {
    constructor(
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject("InterviewApplicationJobRepository") private interviewRepository: IInterviewApplicationJobRepository,
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    private buildJobFunnel(funnel: Awaited<ReturnType<IApplicationRepository["getFunnelByJob"]>>) {
        return [
            { label: "Em triagem", value: funnel.emTriagem },
            { label: "Aprovados", value: funnel.aprovados },
            { label: "Reprovados", value: funnel.reprovados },
            { label: "Contratados", value: funnel.contratados },
        ];
    }

    private buildInterviewChart(interviews: Awaited<ReturnType<IInterviewApplicationJobRepository["countInterviewStatusByJob"]>>) {
        return [
            { label: "Agendadas", value: interviews.scheduled },
            { label: "Concluídas", value: interviews.completed },
            { label: "Canceladas", value: interviews.cancelled },
            { label: "Reagendadas", value: interviews.rescheduled },
        ];
    }

    async execute(company_id: string, job_id?: string) {
        if (job_id) {
            const [funnel, interviews] = await Promise.all([
                this.applicationRepository.getFunnelByJob(job_id),
                this.interviewRepository.countInterviewStatusByJob(job_id),
            ]);

            return {
                candidates: { chart: this.buildJobFunnel(funnel) },
                interviews: { chart: this.buildInterviewChart(interviews) },
            };
        }

        const jobs = await this.jobsRepository.allJobsCompany(company_id);

        const jobsData = await Promise.all(
            jobs.map(async (job) => {
                const [funnel, interviews] = await Promise.all([
                    this.applicationRepository.getFunnelByJob(job.id),
                    this.interviewRepository.countInterviewStatusByJob(job.id),
                ]);

                return {
                    job_id: job.id,
                    vacancy: job.vacancy,
                    candidates: { chart: this.buildJobFunnel(funnel) },
                    interviews: { chart: this.buildInterviewChart(interviews) },
                };
            })
        );

        return { jobs: jobsData };
    }
}

export { GetCompanyFunnelUseCase };
