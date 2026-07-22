import type { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService.js';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository.js';

export class SessionController {
    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userRepository = new PrismaUserRepository();
            const authenticateUserService = new AuthenticateUserService(userRepository);

            const authenticatedUser = await authenticateUserService.execute(email, password);

            const { password: _, ...filteredUser } = authenticatedUser.user;

            return res.status(200).json({
                user: filteredUser,
                token: authenticatedUser.token
            });

        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}