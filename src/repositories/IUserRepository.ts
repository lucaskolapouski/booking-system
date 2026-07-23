import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
    findAllProviders(): Promise<User[]>
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}

