import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../accounts/infra/typeorm/entities/User"; // Importe a entidade User
import { Job } from "../entities/Job";

@Entity("applications")
class Application {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Job)
    @JoinColumn({ name: "job_id" })
    job: Job;

    @Column()
    curriculum_user: string;

    @Column({ type: "boolean", nullable: true, default: null })
    application_approved: boolean | null;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.application_approved = null;
        }
    }
}

export { Application };