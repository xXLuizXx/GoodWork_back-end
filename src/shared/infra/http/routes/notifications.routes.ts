import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetUnreadCountController } from "../../../../modules/notifications/useCases/getUnreadCount/GetUnreadCountController";
import { ListNotificationsController } from "../../../../modules/notifications/useCases/listNotifications/ListNotificationsController";
import { MarkAllAsReadController } from "../../../../modules/notifications/useCases/markAllAsRead/MarkAllAsReadController";
import { MarkAsReadController } from "../../../../modules/notifications/useCases/markAsRead/MarkAsReadController";

const notificationsRoutes = Router();

const getUnreadCountController = new GetUnreadCountController();
const listNotificationsController = new ListNotificationsController();
const markAllAsReadController = new MarkAllAsReadController();
const markAsReadController = new MarkAsReadController();

notificationsRoutes.get("/unread-count", ensureAuthenticated, getUnreadCountController.handle);
notificationsRoutes.get("/", ensureAuthenticated, listNotificationsController.handle);
notificationsRoutes.patch("/read-all", ensureAuthenticated, markAllAsReadController.handle);
notificationsRoutes.patch("/:id/read", ensureAuthenticated, markAsReadController.handle);

export { notificationsRoutes };
