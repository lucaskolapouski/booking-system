import type { IUserRepository } from "../repositories/IUserRepository.js";

export class GetUserProfileService {

    constructor(private userRepository: IUserRepository) {};

    async execute(id: string) {

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("Usuario não encontrado");
        }

        return user;

    }
}