import type { Prisma } from "@prisma/client";
import type { IAppointmentRepository } from "../repositories/IAppointmentRepository.js";
import { isBefore, startOfHour } from "date-fns";
import type { IUserRepository } from "../repositories/IUserRepository.js";

export class CreateAppointmentService {

    constructor(
        private appointmentRepository: IAppointmentRepository,
        private userRepository: IUserRepository
    ) {};

    async execute(providerId: string, customerId: string, date: Date) {

        await this.validateProvider(providerId);
        this.validateCustomer(providerId, customerId)

        const appointmentTime = startOfHour(date);

        this.validateDate(appointmentTime);

        await this.validateAvailability(appointmentTime, providerId);

        return this.appointmentRepository.create(
            this.buildAppointmentData(
                appointmentTime,
                providerId,
                customerId,
            ),
        );

    }

    private async validateProvider(provider_id: string) {

        const provider = await this.userRepository.findById(provider_id);

        if (!provider) {
            throw new Error("Prestador não encontrado.");
        }

        if (provider.role !== "PROVIDER") {
            throw new Error("Só é possível criar agendamentos com um prestador de serviços válido.");
        }

    }

    private validateCustomer(providerId: string, customerId: string) {
        if (providerId === customerId) {
            throw new Error("Não é possível realizar agendamentos consigo mesmo.");
        }
    }

    private validateDate(date: Date) {
        if (isBefore(date, new Date())) {
            throw new Error(
                "O horário deve ser posterior ao atual.",
            );
        }
    }

    private async validateAvailability(date: Date, providerId: string) {
        const appointment =
            await this.appointmentRepository.findByDateAndProvider(
                date,
                providerId,
            );

        if (appointment) {
            throw new Error("O horário está indisponível.");
        }
    }

    private buildAppointmentData(
        date: Date,
        providerId: string,
        customerId: string,
    ): Prisma.AppointmentCreateInput {
        return {
            date,
            provider: {
                connect: {
                    id: providerId,
                },
            },
            customer: {
                connect: {
                    id: customerId,
                },
            },
        };
    }

}