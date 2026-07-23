import type { Prisma, User } from "@prisma/client";
import type { IUserRepository } from "../IUserRepository.js";
import { prisma } from "../../database/prisma.js";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data,
        });
    }

    async findAllProviders(): Promise<User[]> {
        return await prisma.user.findMany({
            where: { role: "PROVIDER" }
        })
    }
}