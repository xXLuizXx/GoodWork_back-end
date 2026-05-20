import { getRepository, Repository } from "typeorm";
import { INotificationsRepository } from "../../../repositories/INotificationsRepository";
import { ICreateNotificationDTO } from "../../../dtos/ICreateNotificationDTO";
import { Notification } from "../entities/Notification";

class NotificationsRepository implements INotificationsRepository {
    private repository: Repository<Notification>;

    constructor() {
        this.repository = getRepository(Notification);
    }

    async create(data: ICreateNotificationDTO): Promise<void> {
        const notification = this.repository.create({
            user_id: data.user_id,
            type: data.type,
            title: data.title,
            body: data.body,
            resource_id: data.resource_id ?? null,
            resource_type: data.resource_type ?? null,
        });

        await this.repository.save(notification);
    }

    async findUnreadCountByUser(user_id: string): Promise<number> {
        return this.repository.count({ where: { user_id, is_read: false } });
    }

    async findByUser(user_id: string): Promise<Notification[]> {
        return this.repository.find({
            where: { user_id },
            order: { created_at: "DESC" },
            take: 50,
        });
    }

    async findById(id: string): Promise<Notification | undefined> {
        return this.repository.findOne({ where: { id } });
    }

    async markAsRead(id: string): Promise<void> {
        await this.repository.createQueryBuilder()
            .update(Notification)
            .set({ is_read: true, read_at: new Date() })
            .where("id = :id", { id })
            .execute();
    }

    async markAllAsRead(user_id: string): Promise<void> {
        await this.repository.createQueryBuilder()
            .update(Notification)
            .set({ is_read: true, read_at: new Date() })
            .where("user_id = :user_id AND is_read = false", { user_id })
            .execute();
    }
}

export { NotificationsRepository };
