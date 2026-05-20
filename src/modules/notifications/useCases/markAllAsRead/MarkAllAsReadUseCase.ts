import { inject, injectable } from "tsyringe";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";

@injectable()
class MarkAllAsReadUseCase {
    constructor(
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    async execute(user_id: string): Promise<void> {
        await this.notificationsRepository.markAllAsRead(user_id);
    }
}

export { MarkAllAsReadUseCase };
