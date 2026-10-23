interface ICreateNotificationDTO {
    user_id: string;
    type: string;
    title: string;
    body: string;
    resource_id?: string;
    resource_type?: "application" | "interview" | "job" | "category" | "user";
}

export type { ICreateNotificationDTO };
