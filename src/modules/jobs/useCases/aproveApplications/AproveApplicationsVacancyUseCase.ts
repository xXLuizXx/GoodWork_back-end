import path from "path";
import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";
import { IApproveApplicationDTO } from "../../dtos/IAprovedApplicationsDTO";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";
import { INotificationsRepository } from "../../../notifications/repositories/INotificationsRepository";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class AproveApplicationsVacancyUseCase {
    constructor(
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject("MailRepository") private mailProvider: IMailProvider,
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    async aproveApplication(applications: IApproveApplicationDTO[]): Promise<void> {
        for (const application of applications) {
            await this.applicationRepository.aproveApplication(application.id, {
                application_approved: application.application_approved,
                job_id: application.job_id,
            } as any);

            const appDetails = await this.applicationRepository.findById(application.id);
            if (!appDetails) continue;

            const companyName = appDetails.job.contractor || (appDetails.job as any).jobUser?.name || "Empresa";
            const vacancyName = appDetails.job.vacancy;

            if (application.application_approved === true) {
                const templatePath = path.resolve("src", "views", "emails", "application-approved.hbs");
                await this.mailProvider.sendMail({
                    to: appDetails.user.email,
                    subject: `Você foi aprovado para a entrevista — ${vacancyName}`,
                    variables: {
                        name: appDetails.user.name,
                        vacancy_name: vacancyName,
                        company_name: companyName,
                    },
                    path: templatePath,
                });
                await this.notificationsRepository.create({
                    user_id: appDetails.user.id,
                    type: "application_approved",
                    title: "Candidatura aprovada",
                    body: `Sua candidatura para ${vacancyName} foi aprovada para entrevista.`,
                    resource_id: application.id,
                    resource_type: "application",
                });
            }

            if (application.application_approved === false) {
                const templatePath = path.resolve("src", "views", "emails", "reject.hbs");
                await this.mailProvider.sendMail({
                    to: appDetails.user.email,
                    subject: "Agradecemos seu interesse em trabalhar conosco",
                    variables: {
                        name: appDetails.user.name,
                        vacancy_name: vacancyName,
                        company_name: companyName,
                    },
                    path: templatePath,
                });
                await this.notificationsRepository.create({
                    user_id: appDetails.user.id,
                    type: "application_rejected",
                    title: "Candidatura reprovada",
                    body: `Sua candidatura para ${vacancyName} não foi aprovada.`,
                    resource_id: application.id,
                    resource_type: "application",
                });
            }
        }
    }
}

export { AproveApplicationsVacancyUseCase };
