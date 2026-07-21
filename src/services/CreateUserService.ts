import type { Prisma } from "@prisma/client";
import type { IUserRepository } from "../repositories/IUserRepository.js";
import { hash } from "bcryptjs";

export class CreateUserService {

    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email, password, role }: Prisma.UserCreateInput) {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("Este e-mail já está em uso.");
        }

        const passwordHash = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            role
        })

        return user;

    }

}