import path from "path";
import { inject, injectable } from "tsyringe";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";
import { ICreateNotificationDTO } from "../../dtos/ICreateNotificationDTO";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

interface INotifyUserEmail {
    to: string;
    subject: string;
    // Nome do arquivo em src/views/emails (ex.: "hired.hbs")
    template: string;
    variables: Record<string, unknown>;
}

interface INotifyUser extends ICreateNotificationDTO {
    email?: INotifyUserEmail;
}

// Ponto único para avisar um usuário: notificação no sino e, opcionalmente, e-mail.
// Os dois são "melhor esforço": uma falha só gera log e nunca desfaz nem interrompe a ação que os disparou
// (ex.: o Brevo fora do ar não pode fazer o cancelamento de uma entrevista responder 500 depois de gravado).
@injectable()
class NotifyUserUseCase {
    constructor(
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository,
        @inject("MailRepository") private mailProvider: IMailProvider
    ) {}

    async execute({ email, ...notification }: INotifyUser): Promise<void> {
        await Promise.all([
            this.notificationsRepository.create(notification).catch((error) => {
                console.error(`[NotifyUser] Falha ao criar a notificação ${notification.type}:`, error);
            }),
            email && this.mailProvider.sendMail({
                to: email.to,
                subject: email.subject,
                variables: email.variables,
                path: path.resolve("src", "views", "emails", email.template),
            }).catch((error) => {
                console.error(`[NotifyUser] Falha ao enviar o e-mail ${email.template} para ${email.to}:`, error);
            }),
        ]);
    }
}

export { NotifyUserUseCase };
