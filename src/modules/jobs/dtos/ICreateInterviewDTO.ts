import { Application } from "../infra/typeorm/entities/Application";

interface ICreateInterviewDTO {
    application: Application;
    interview_type: "presencial" | "online";
    scheduled_date: string;
    duration_minutes?: number;
    location?: string | null;
    meeting_link?: string | null;
    interviewer_name?: string | null;
    interviewer_email?: string | null;
    interviewer_position?: string | null;
    notes?: string | null;
    status?: "scheduled" | "completed" | "cancelled" | "rescheduled";
}

export { ICreateInterviewDTO }