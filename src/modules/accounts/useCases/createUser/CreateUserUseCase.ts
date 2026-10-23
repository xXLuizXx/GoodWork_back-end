import { inject, injectable } from "tsyringe";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { isValidCNPJ, isValidCPF, isValidEmail } from "../../../../utils/documentValidator";
import { NotifyAdminsUseCase } from "../../../notifications/useCases/notifyAdmins/NotifyAdminsUseCase";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
        @inject("MailRepository")
        private mailProvider: IMailProvider,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
        @inject(NotifyAdminsUseCase)
        private notifyAdmins: NotifyAdminsUseCase,
    ) {}

    async execute({
        name,
        road,
        number,
        identifier,
        neighborhood,
        telephone,
        email,
        password,
        user_type,
        sex,
        is_employee,
        functionn,
        ability,
        curriculum,
        categories_interest,
        business_area,
    }: ICreateUsersDTO): Promise<void> {
        // Em qualquer recusa, remove o currículo que o upload já salvou
        const reject = async (message: string, statusCode = 400): Promise<never> => {
            if (curriculum) {
                await this.storageProvider.delete(curriculum, "curriculums/curriculums_user_profile").catch(() => undefined);
            }
            throw new AppError(message, statusCode);
        };

        if (user_type !== "individual" && user_type !== "company") {
            await reject("Tipo de usuário inválido.");
        }

        if (!name?.trim() || !road?.trim() || !number?.toString().trim() || !neighborhood?.trim() || !telephone?.trim()) {
            await reject("Preencha todos os campos obrigatórios.");
        }

        if (!isValidEmail(email)) {
            await reject("Informe um e-mail válido.");
        }

        if (!password || password.length < 6) {
            await reject("A senha deve ter pelo menos 6 caracteres.");
        }

        if (user_type === "individual" && !isValidCPF(identifier)) {
            await reject("CPF inválido.");
        }

        if (user_type === "company" && !isValidCNPJ(identifier)) {
            await reject("CNPJ inválido.");
        }

        if (user_type === "individual" && (!sex || !functionn || !ability)) {
            await reject("Preencha sexo, função e habilidades.");
        }

        if (user_type === "company" && !business_area) {
            await reject("Informe a área de atuação da empresa.");
        }

        if (await this.usersRepository.findByEmail(email)) {
            await reject("Já existe uma conta com este e-mail.");
        }

        if (await this.usersRepository.findByIdentifier(identifier)) {
            await reject(user_type === "company" ? "Já existe uma conta com este CNPJ." : "Já existe uma conta com este CPF.");
        }

        const passwordHash = await hash(password, 8);

        try {
            if (user_type === "individual") {
                await this.usersRepository.create({
                    name,
                    road,
                    number,
                    identifier,
                    neighborhood,
                    telephone,
                    email,
                    password: passwordHash,
                    user_type,
                    sex,
                    is_employee,
                    functionn,
                    ability,
                    curriculum,
                    categories_interest,
                });

            } else {
                await this.usersRepository.create({
                    name,
                    road,
                    number,
                    identifier,
                    neighborhood,
                    telephone,
                    email,
                    password: passwordHash,
                    user_type,
                    business_area,
                });
            }
        } catch (err) {
            // Dois cadastros simultâneos passam pelas buscas acima; os índices únicos do banco barram o segundo
            if (err?.code === "23505") {
                await reject(err.constraint === "UQ_users_identifier_digits"
                    ? (user_type === "company" ? "Já existe uma conta com este CNPJ." : "Já existe uma conta com este CPF.")
                    : "Já existe uma conta com este e-mail.");
            }
            throw err;
        }

        const user = await this.usersRepository.findByEmail(email);

        const token = uuidV4();
        const expiresDate = this.dateProvider.addHours(24);

        await this.usersTokensRepository.create({
            userId: user.id,
            refreshToken: token,
            expiresDate,
            type: "email_verification",
        });

        const verifyLink = `${process.env.APP_WEB_URL}/verify-account?token=${token}`;
        const templatePath = path.resolve("src", "views", "emails", "verify-account.hbs");

        try {
            await this.mailProvider.sendMail({
                to: user.email,
                subject: "Confirme seu e-mail — GoodWork",
                variables: { name: user.name, link: verifyLink },
                path: templatePath,
            });
        } catch (error) {
            // Sem o e-mail a conta não pode ser verificada: desfaz o cadastro para a pessoa poder tentar de novo
            console.error("[CreateUser] Falha ao enviar e-mail de verificação:", error);
            await this.usersRepository.deleteById(user.id);
            await reject("Não foi possível enviar o e-mail de verificação. Tente novamente em instantes.", 503);
        }

        // Só depois do e-mail: se ele falhar, o cadastro é desfeito e a notificação apontaria para um usuário inexistente
        await this.notifyAdmins.execute({
            type: "user_registered",
            title: "Novo usuário cadastrado",
            body: `${user.name} se cadastrou como ${user_type === "company" ? "empresa" : "candidato"}.`,
            resource_id: user.id,
            resource_type: "user",
        });
    }

}

export { CreateUserUseCase };
