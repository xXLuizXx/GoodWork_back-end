import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    TableInheritance, 
    PrimaryColumn, 
    OneToOne, 
    JoinColumn 
} from "typeorm";
import { IndividualUser } from "../entities/IndividualUser"
import { CompanyUser } from "../entities/CompanyUser";
import { v4 as uuidV4 } from "uuid";
import { Expose } from "class-transformer";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    telephone: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column()
    avatar: string;

    @Column()
    road: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    identifier: string;

    @Column({ type: "varchar", default: null })
    user_type: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => IndividualUser, (individual) => individual.user, { cascade: true })
    @JoinColumn({ name: "id" })
    individualData: IndividualUser;

    @OneToOne(() => CompanyUser, (company) => company.user, { cascade: true })
    @JoinColumn({ name: "id" })
    companyData: CompanyUser;

    constructor(userType?: string) {
        if (!this.id) {
            this.id = uuidV4();
        }

        if (userType) {
            this.user_type = userType;
        }
    }

    @Expose({ name: "avatarUrl" })
    getAvatarUrl(): string {
        return this.avatar
            ? `${process.env.STORAGE_URL}/avatars/${this.avatar}`
            : null;
    }
}

export { User };
