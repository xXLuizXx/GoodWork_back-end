import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity("individual_users")
class IndividualUser {
    @PrimaryColumn()
    id: string;

    @Column()
    sex: string;

    @Column()
    functionn: string;

    @Column()
    ability: string;

    @Column({ default: false })
    is_employee: boolean;

    @Column()
    curriculum: string;

    @Column()
    categories_interest: string;

    @OneToOne(() => User, (user) => user.individualData)
    user: User;
}

export { IndividualUser };
