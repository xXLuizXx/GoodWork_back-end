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
    ability: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }

    avatarUrl(): string {
        const avatar = this.avatar ?? "default_avatar.png";
    
        return `${process.env.API_URL}/avatar/${avatar}`; 
        
      }
}




export { User }