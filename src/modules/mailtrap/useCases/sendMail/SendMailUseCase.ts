import { inject, injectable } from "tsyringe";
import { ISendMailDTO } from "../../dtos/ISendMailDTO";
import { ISendMailUseCase } from "./ISendMailUseCase";
import { IMailRepository } from "../../repositories/IMailRepository"

@injectable()
class SendMailUseCase implements ISendMailUseCase {
    constructor(@inject("MailRepository") private mailRepository: IMailRepository) {}

    async execute({ to, subject, variables, path }: ISendMailDTO): Promise<void> {
        await this.mailRepository.sendMail({
            to,
            subject,
            variables,
            path,
        });
    }
}

export { SendMailUseCase };