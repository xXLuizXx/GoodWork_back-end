import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";
import { IInterviewApplicationJobRepository } from "../../repositories/IInterviewApplicationJobRepository";

@injectable()
class GetIndividualOverviewUseCase {
    constructor(
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject("InterviewApplicationJobRepository") private interviewRepository: IInterviewApplicationJobRepository
    ) {}

    async execute(user_id: string) {
        const [applications, interviews] = await Promise.all([
            this.applicationRepository.getIndividualStats(user_id),
            this.interviewRepository.getInterviewsByUser(user_id),
        ]);

        return {
            applications: {
                total: applications.total,
                approvalRate: applications.approvalRate,
                chart: [
                    { label: "Em triagem", value: applications.emTriagem },
                    { label: "Aprovados", value: applications.aprovados },
                    { label: "Reprovados", value: applications.reprovados },
                    { label: "Contratados", value: applications.contratados },
                ],
            },
            interviews: {
                chart: [
                    { label: "Agendadas", value: interviews.scheduled },
                    { label: "Concluídas", value: interviews.completed },
                    { label: "Canceladas", value: interviews.cancelled },
                ],
            },
        };
    }
}

export { GetIndividualOverviewUseCase };
