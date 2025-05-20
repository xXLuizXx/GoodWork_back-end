import { ISendMailDTO } from "../dtos/ISendMailDTO";

interface IMailRepository {
    sendMail(data: ISendMailDTO): Promise<void>;
}

export { IMailRepository };