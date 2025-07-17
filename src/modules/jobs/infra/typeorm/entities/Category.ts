import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from "../../../../accounts/infra/typeorm/entities/User";
@Entity("categories")
class Category {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column({ type: "boolean", nullable: true, default: null })
    valid_category: boolean | null;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Category };