import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Application } from "./Application";
import { v4 as uuidV4 } from "uuid";

@Entity("interviews")
class Interview {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Application, (application) => application.interview)
    @JoinColumn({ name: "application_id" })
    application: Application;

    @Column("varchar")
    interview_type: "presencial" | "online";

    @Column("timestamp")
    scheduled_date: Date;

    @Column("integer", { default: 30 })
    duration_minutes: number;

    @Column("varchar", { nullable: true })
    location: string | null;

    @Column("varchar", { nullable: true })
    meeting_link: string | null;

    @Column("varchar", { nullable: true })
    interviewer_name: string | null;

    @Column("varchar", { nullable: true })
    interviewer_email: string | null;

    @Column("text", { nullable: true })
    notes: string | null;

    @Column("varchar", { default: "scheduled" })
    status: "scheduled" | "completed" | "cancelled" | "rescheduled";

    @CreateDateColumn()
    created_at: Date;
    
    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Interview }