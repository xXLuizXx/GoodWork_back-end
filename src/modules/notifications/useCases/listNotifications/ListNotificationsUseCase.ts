import { inject, injectable } from "tsyringe";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";
import { Notification } from "../../infra/typeorm/entities/Notification";

@injectable()
class ListNotificationsUseCase {
    constructor(
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    async execute(user_id: string): Promise<Notification[]> {
        return this.notificationsRepository.findByUser(user_id);
    }
}

export { ListNotificationsUseCase };
