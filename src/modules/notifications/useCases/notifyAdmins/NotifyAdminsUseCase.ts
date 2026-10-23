import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateNotificationDTO } from "../../dtos/ICreateNotificationDTO";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";

type IAdminNotification = Omit<ICreateNotificationDTO, "user_id">;

@injectable()
class NotifyAdminsUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    // Notifica todos os admins ativos, exceto quem originou o evento.
    // Nunca lança erro: uma falha aqui não pode desfazer a vaga, categoria ou cadastro que a disparou.
    async execute(notification: IAdminNotification, except_user_id?: string): Promise<void> {
        try {
            const admins = await this.usersRepository.findAdmins();

            await Promise.all(
                admins
                    .filter((admin) => admin.id !== except_user_id)
                    .map((admin) => this.notificationsRepository.create({ ...notification, user_id: admin.id }))
            );
        } catch (error) {
            console.error(`[NotifyAdmins] Falha ao notificar os admins (${notification.type}):`, error);
        }
    }
}

export { NotifyAdminsUseCase };
