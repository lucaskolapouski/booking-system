import type { Request, Response } from 'express';
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository.js";
import { CreateUserService } from "../services/CreateUserService.js";
import { UserMapper } from '../mappers/UserMapper.js';

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;

            const userRepository = new PrismaUserRepository();
            const createUserService = new CreateUserService(userRepository);

            const user = await createUserService.execute({
                name,
                email,
                password,
                role
            });

            return res.status(201).json(UserMapper.toResponse(user));

        } catch (error: any) {

            return res.status(400).json({ error: error.message });

        }
    }
}