import type { IUserRepository } from "../repositories/IUserRepository.js";

export class ListProvidersService {

    constructor(
        private userRepository: IUserRepository
    ) {};

    async execute() {
        return this.userRepository.findAllProviders();
    }
}