import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppErrors';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UserRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    };

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "3de5b9ee05c957ae9c67db35c6f4eb78") as IPayload;
        
        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401)
        }

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }

} ;