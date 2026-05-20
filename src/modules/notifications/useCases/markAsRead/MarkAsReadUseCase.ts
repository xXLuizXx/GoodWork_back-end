import { inject, injectable } from "tsyringe";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class MarkAsReadUseCase {
    constructor(
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    async execute(notification_id: string, user_id: string): Promise<void> {
        const notification = await this.notificationsRepository.findById(notification_id);

        if (!notification) {
            throw new AppError("Notificação não encontrada.", 404);
        }

        if (notification.user_id !== user_id) {
            throw new AppError("Você não tem permissão para acessar esta notificação.", 403);
        }

        if (notification.is_read) {
            return;
        }

        await this.notificationsRepository.markAsRead(notification_id);
    }
}

export { MarkAsReadUseCase };
