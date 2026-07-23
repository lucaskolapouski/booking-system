import type { Prisma, Appointment } from "@prisma/client";
import type { IAppointmentRepository } from "../IAppointmentRepository.js";
import { prisma } from "../../database/prisma.js";

export class PrismaAppointmentRepository implements IAppointmentRepository {

    async create(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
        return await prisma.appointment.create({
            data
        })
    }

    async findByDateAndProvider(date: Date, provider_id: string): Promise<Appointment | null> {
        return await prisma.appointment.findFirst({
            where: { date, provider_id }
        })
    }

}