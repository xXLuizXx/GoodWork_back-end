import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, _response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, auth.secretToken) as IPayload;
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exist", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    }catch{
        throw new AppError("Invalid token", 401);
    }
}
