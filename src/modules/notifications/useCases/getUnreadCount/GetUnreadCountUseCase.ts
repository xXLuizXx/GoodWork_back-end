import { inject, injectable } from "tsyringe";
import { INotificationsRepository } from "../../repositories/INotificationsRepository";

@injectable()
class GetUnreadCountUseCase {
    constructor(
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ) {}

    async execute(user_id: string): Promise<{ count: number }> {
        const count = await this.notificationsRepository.findUnreadCountByUser(user_id);
        return { count };
    }
}

export { GetUnreadCountUseCase };
