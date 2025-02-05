import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity("company_users")
class CompanyUser {
  @PrimaryColumn()
  id: string;

  @Column()
  business_area: string;

  @OneToOne(() => User, (user) => user.companyData)
  user: User;
}

export { CompanyUser };