import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("notifications")
class Notification {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ type: "uuid", nullable: true })
    resource_id: string | null;

    @Column({ nullable: true })
    resource_type: string | null;

    @Column({ default: false })
    is_read: boolean;

    @Column({ type: "timestamp", nullable: true })
    read_at: Date | null;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.is_read = false;
            this.resource_id = null;
            this.resource_type = null;
            this.read_at = null;
        }
    }
}

export { Notification };
