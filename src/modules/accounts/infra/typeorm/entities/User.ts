import { v4 as uuidV4} from "uuid"
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("users")
class User{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    road: string;

    @Column()
    number: string;
    
    @Column()
    identifier: string;

    @Column()
    neighborhood: string;

    @Column()
    sex: string;

    @Column()
    telephone: string;

    @Column()
    is_employee: string;
    
    @Column()
    functionn: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column()
    access_type: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}


export { User }