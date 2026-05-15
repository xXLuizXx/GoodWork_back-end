import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCompanyFunnelUseCase } from "./GetCompanyFunnelUseCase";

class GetCompanyFunnelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: company_id } = request.user;
        const { job_id } = request.query as { job_id?: string };
        const useCase = container.resolve(GetCompanyFunnelUseCase);
        const data = await useCase.execute(company_id, job_id);
        return response.status(200).json(data);
    }
}

export { GetCompanyFunnelController };
