import type { Request, Response } from 'express';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository.js';
import { ListProvidersService } from '../services/ListProvidersService.js';
import { UserMapper } from '../mappers/UserMapper.js';

export class ProviderController {
    async index(req: Request, res: Response) {

        const userRepository = new PrismaUserRepository();
        const listProvidersService = new ListProvidersService(userRepository);

        const users = await listProvidersService.execute();

        return res.status(200).json(
            users.map(user => UserMapper.toResponse(user))
        );

    }
}