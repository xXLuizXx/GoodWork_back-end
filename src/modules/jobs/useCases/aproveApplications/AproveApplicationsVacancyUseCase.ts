import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";
import { IApproveApplicationDTO } from "../../dtos/IAprovedApplicationsDTO";
import { NotifyUserUseCase } from "../../../notifications/useCases/notifyUser/NotifyUserUseCase";

@injectable()
class AproveApplicationsVacancyUseCase {
    constructor(
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject(NotifyUserUseCase) private notifyUser: NotifyUserUseCase
    ) {}

    async aproveApplication(applications: IApproveApplicationDTO[]): Promise<void> {
        const notifications: Promise<void>[] = [];

        for (const application of applications) {
            await this.applicationRepository.aproveApplication(application.id, {
                application_approved: application.application_approved,
                job_id: application.job_id,
            } as any);

            const appDetails = await this.applicationRepository.findById(application.id);
            if (!appDetails) continue;

            const companyName = appDetails.job.contractor || (appDetails.job as any).jobUser?.name || "Empresa";
            const vacancyName = appDetails.job.vacancy;
            const variables = { name: appDetails.user.name, vacancy_name: vacancyName, company_name: companyName };

            if (application.application_approved === true) {
                notifications.push(this.notifyUser.execute({
                    user_id: appDetails.user.id,
                    type: "application_approved",
                    title: "Candidatura aprovada",
                    body: `Sua candidatura para ${vacancyName} foi aprovada para entrevista.`,
                    resource_id: application.id,
                    resource_type: "application",
                    email: {
                        to: appDetails.user.email,
                        subject: `Você foi aprovado para a entrevista — ${vacancyName}`,
                        template: "application-approved.hbs",
                        variables,
                    },
                }));
            }

            if (application.application_approved === false) {
                notifications.push(this.notifyUser.execute({
                    user_id: appDetails.user.id,
                    type: "application_rejected",
                    title: "Candidatura reprovada",
                    body: `Sua candidatura para ${vacancyName} não foi aprovada.`,
                    resource_id: application.id,
                    resource_type: "application",
                    email: {
                        to: appDetails.user.email,
                        subject: "Agradecemos seu interesse em trabalhar conosco",
                        template: "reject.hbs",
                        variables,
                    },
                }));
            }
        }

        // Todas as decisões já estão gravadas; os avisos saem em paralelo e não interrompem o lote se algum falhar
        await Promise.all(notifications);
    }
}

export { AproveApplicationsVacancyUseCase };
