import type { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService.js';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository.js';
import { UserMapper } from '../mappers/UserMapper.js';

export class SessionController {
    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userRepository = new PrismaUserRepository();
            const authenticateUserService = new AuthenticateUserService(userRepository);

            const authentication = await authenticateUserService.execute(email, password);

            return res.status(200).json({
                user: UserMapper.toResponse(authentication.user),
                token: authentication.token
            });

        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}