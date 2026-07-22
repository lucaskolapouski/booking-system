import { compare } from "bcryptjs";
import type { IUserRepository } from "../repositories/IUserRepository.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export class AuthenticateUserService {

    constructor(private userRepository: IUserRepository) {};

    async execute(email: string, password: string) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Usuário ou senha incorretos.");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorretos.");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não configurado.");
        }

        const signOptions: SignOptions = {
            subject: user.id,
            expiresIn: "1d"
        }

        const payload = {
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions);

        return {
            user,
            token
        };
    }

}