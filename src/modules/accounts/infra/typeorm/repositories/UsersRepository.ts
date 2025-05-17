import { Brackets, getRepository, Repository } from "typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IndividualUser } from "../entities/IndividualUser";
import { CompanyUser } from "../entities/CompanyUser";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { plainToClass } from "class-transformer";
import { IDataUsersDTO } from "../../../dtos/IDataUsersDTO";

class UsersRepository implements IUsersRepository {
    private baseRepository: Repository<User>;
    private individualRepository: Repository<IndividualUser>;
    private companyRepository: Repository<CompanyUser>;

    constructor() {
        this.baseRepository = getRepository(User);
        this.individualRepository = getRepository(IndividualUser);
        this.companyRepository = getRepository(CompanyUser);
    }

    async create(data: ICreateUsersDTO): Promise<void> {
        const {
            id,
            name,
            email,
            password,
            telephone,
            avatar,
            road,
            number,
            neighborhood,
            identifier,
            user_type,
            sex,
            functionn,
            ability,
            is_employee,
            curriculum,
            business_area,
        } = data;
        
        const user = this.baseRepository.create({
            id,
            name,
            email,
            password,
            telephone,
            avatar,
            road,
            number,
            neighborhood,
            identifier,
            user_type: data.user_type,
        });

        await this.baseRepository.save(user);

        if (user_type === "individual") {
            const individualUser = this.individualRepository.create({
                id: user.id,
                sex,
                functionn,
                ability,
                is_employee,
                curriculum,
            });

            await this.individualRepository.save(individualUser);
        } else if (user_type === "company") {
            const companyUser = this.companyRepository.create({
                id: user.id,
                business_area,
            });

            await this.companyRepository.save(companyUser);
        } else {
            throw new Error("Invalid user type");
        }
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.baseRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.individualData", "individual")
            .leftJoinAndSelect("user.companyData", "company")
            .where("user.email = :email", { email })
            .getOne();

        return user ? plainToClass(User, user) : null;
    }

    async findById(id: string): Promise<User> {
        const user = await this.baseRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.individualData", "individual")
            .leftJoinAndSelect("user.companyData", "company")
            .where("user.id = :id", { id })
            .getOne();

        return user;
    }

    async update(user: User, profileTipeUser): Promise<void> {
        await this.baseRepository
            .createQueryBuilder()
            .update('users')
            .set({
                road: user.road,
                number: user.number,
                neighborhood: user.neighborhood,
                telephone: user.telephone,
            })
            .where("id = :id", { id: user.id })
            .execute();

        if(user.user_type === "individual"){
            await this.individualRepository
            .createQueryBuilder()
            .update('individual_users')
            .set({
                functionn: profileTipeUser.functionn,
                ability: profileTipeUser.ability,
                is_employee: profileTipeUser.is_employee

            })
            .where("id = :id", { id: user.id })
            .execute();
        } else if(user.user_type === "company"){
            await this.individualRepository
            .createQueryBuilder()
            .update('company_users')
            .set({
                business_area: profileTipeUser.business_area,
            })
            .where("id = :id", { id: user.id })
            .execute();
        }
    }

    async listAllUsers(id: string): Promise<IDataUsersDTO[]> {
        return await this.baseRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.individualData", "individual")
            .leftJoinAndSelect("user.companyData", "company")
            .select([
                'user.id',
                'user.name',
                'user.email',
                'user.telephone',
                'user.avatar',
                'user.road',
                'user.number',
                'user.neighborhood',
                'user.user_type',
                'individual.functionn',
                'individual.ability',
                'individual.is_employee',
                'individual.curriculum',
                'company.business_area'
            ])
            .where("user.id != :id", { id: id }).
            andWhere("user.isAdmin IS FALSE")
            .getMany();
    }

    async listAllUsersString(search: string, id: string): Promise<IDataUsersDTO[]> {
        return await this.baseRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.individualData", "individual")
            .leftJoinAndSelect("user.companyData", "company")
            .select([
                'user.id',
                'user.name',
                'user.email',
                'user.telephone',
                'user.avatar',
                'user.road',
                'user.number',
                'user.neighborhood',
                'user.user_type',
                'individual.functionn',
                'individual.ability',
                'individual.is_employee',
                'individual.curriculum',
                'company.business_area'
            ])
            .where("user.id != :id", { id })
            .andWhere("user.isAdmin IS FALSE")
            .andWhere(
                new Brackets(qb => {
                    qb.where("user.name LIKE :search", { search: `%${search}%` })
                      .orWhere("individual.functionn LIKE :search", { search: `%${search}%` })
                      .orWhere("individual.ability LIKE :search", { search: `%${search}%` });
                })
            )
            .getMany();
    }
}

export { UsersRepository };
