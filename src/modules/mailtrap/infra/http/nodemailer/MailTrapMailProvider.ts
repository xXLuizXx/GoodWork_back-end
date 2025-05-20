import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import dotenv from 'dotenv';
import { IMailRepository } from "../../../repositories/IMailRepository";
import { ISendMailDTO } from "../../../dtos/ISendMailDTO";
dotenv.config();

@injectable()
class MailTrapMailProvider implements IMailRepository {
    private client: Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        this.client = transporter;
    }

    async sendMail({ to, subject, variables, path }: ISendMailDTO): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: "GoodWork <noreply@goodwork.com>",
            subject,
            html: templateHTML,
        });
    }
}

export { MailTrapMailProvider };