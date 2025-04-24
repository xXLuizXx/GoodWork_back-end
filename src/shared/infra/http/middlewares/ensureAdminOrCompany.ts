import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdminOrCompany( request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin && user.user_type !== "company") {
        throw new AppError("Acesso negado: requer admin ou company.", 403);
    }

    return next();
}