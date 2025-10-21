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

    async reject(request: Request, response: Response): Promise<Response> {
        const { rejections, template_type } = request.body;

        // Se for um lote de rejeições
        if (rejections && Array.isArray(rejections)) {
            const templatePath = resolve(
                process.cwd(),
                'src',
                'views',
                'emails',
                'reject.hbs'
            );

            const sendMailUseCase = container.resolve(SendMailUseCase);
            
            const results = [];
            
            // Processa cada rejeição individualmente
            for (const rejection of rejections) {
                try {
                    await sendMailUseCase.execute({
                        to: rejection.to,
                        subject: "Agradecemos seu interesse em trabalhar conosco",
                        variables: {
                            name: rejection.candidate_name,
                            company_name: rejection.company_name,
                            vacancy_name: rejection.vacancy_name
                        },
                        path: templatePath
                    });
                    
                    results.push({
                        to: rejection.to,
                        status: 'success'
                    });
                    
                } catch (error) {
                    console.error(`Erro ao enviar e-mail para ${rejection.to}:`, error);
                    results.push({
                        to: rejection.to,
                        status: 'error',
                        error: error.message
                    });
                }
            }

            const successful = results.filter(r => r.status === 'success').length;
            const failed = results.filter(r => r.status === 'error').length;

            return response.json({
                success: true,
                sent: successful,
                failed: failed,
                total: rejections.length,
                results: results
            });
        }
        
        // Se for um e-mail individual (mantém compatibilidade)
        const { to, subject, variables } = request.body;

        const templatePath = resolve(
            process.cwd(),
            'src',
            'views',
            'emails',
            'reject.hbs'
        );

        const sendMailUseCase = container.resolve(SendMailUseCase);

        await sendMailUseCase.execute({
            to,
            subject: subject || "Agradecemos seu interesse em trabalhar conosco",
            variables,
            path: templatePath
        });

        return response.send();
    }
}

export { SendMailController };