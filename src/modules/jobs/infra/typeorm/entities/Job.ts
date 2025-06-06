import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";
import { User } from "../../../../accounts/infra/typeorm/entities/User";

@Entity("jobs")
class Job {
    @PrimaryColumn()
    id: string;

    @Column()
    vacancy: string;

    @Column()
    contractor: string;

    @Column()
    description_vacancy: string;

    @Column()
    requirements: string;
    
    @Column()
    workload: string;
    
    @Column()
    location: string;
    
    @Column()
    benefits: string;
    
    @Column()
    banner: string;
    
    @Column()
    vacancy_available: boolean;
    
    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category: Category;

    @Column()
    category_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "boolean", nullable: true, default: null })
    valid_vacancy: boolean | null;

    @Column()
    amount_vacancy: number;

    @Column()
    closing_date: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
            this.vacancy_available = true;
            this.valid_vacancy = null;
        }
    }
    bannerUrl(): string {
        const banner = this.banner;
    
        return `${process.env.API_URL}/banners/${banner}`; 
        
    }
}

export { Job }