import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js";
import { GetUserProfileService } from "../services/GetUserProfileService.js";
import type { Request, Response } from 'express';

export class ProfileController {
    async show(req: Request, res: Response) {

        try {
            const userRepository = new PrismaUserRepository();
            const getUserProfileService = new GetUserProfileService(userRepository);

            const user = await getUserProfileService.execute(req.user.id);

            const { password: _, ...filteredUser } = user;

            return res.status(200).json(filteredUser);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}