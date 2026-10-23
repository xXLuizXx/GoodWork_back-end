import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateNotificationDTO } from "../../dtos/ICreateNotificationDTO";
import { NotifyUserUseCase } from "../notifyUser/NotifyUserUseCase";

type IAdminNotification = Omit<ICreateNotificationDTO, "user_id">;

@injectable()
class NotifyAdminsUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject(NotifyUserUseCase) private notifyUser: NotifyUserUseCase
    ) {}

    // Notifica todos os admins ativos, exceto quem originou o evento. Só no sino, sem e-mail.
    // Nunca lança erro: uma falha aqui não pode desfazer a vaga, categoria ou cadastro que a disparou.
    async execute(notification: IAdminNotification, except_user_id?: string): Promise<void> {
        try {
            const admins = await this.usersRepository.findAdmins();

            await Promise.all(
                admins
                    .filter((admin) => admin.id !== except_user_id)
                    .map((admin) => this.notifyUser.execute({ ...notification, user_id: admin.id }))
            );
        } catch (error) {
            console.error(`[NotifyAdmins] Falha ao buscar os admins (${notification.type}):`, error);
        }
    }
}

export { NotifyAdminsUseCase };
