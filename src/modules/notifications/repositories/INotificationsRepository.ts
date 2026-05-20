import { ICreateNotificationDTO } from "../dtos/ICreateNotificationDTO";
import { Notification } from "../infra/typeorm/entities/Notification";

interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Promise<void>;
    findUnreadCountByUser(user_id: string): Promise<number>;
    findByUser(user_id: string): Promise<Notification[]>;
    findById(id: string): Promise<Notification | undefined>;
    markAsRead(id: string): Promise<void>;
    markAllAsRead(user_id: string): Promise<void>;
}

export type { INotificationsRepository };
