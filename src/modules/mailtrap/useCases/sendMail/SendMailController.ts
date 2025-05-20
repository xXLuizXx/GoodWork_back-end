import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendMailUseCase } from "./SendMailUseCase";
import { ISendMailDTO } from "../../dtos/ISendMailDTO";
import { resolve } from "path";

class SendMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { to, subject, variables } = request.body;

        const templatePath = resolve(
            process.cwd(),
            'src',
            'views',
            'emails',
            'contact.hbs'
        );

        const sendMailUseCase = container.resolve(SendMailUseCase);

        await sendMailUseCase.execute({
            to,
            subject,
            variables,
            path: templatePath
        });

        return response.send();
    }
}

export { SendMailController };