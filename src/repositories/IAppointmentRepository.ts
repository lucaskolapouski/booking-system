import type { Appointment, Prisma } from "@prisma/client";

export interface IAppointmentRepository {
    create(data: Prisma.AppointmentCreateInput): Promise<Appointment>;
    findByDateAndProvider(date: Date, provider_id: string): Promise<Appointment | null>;
}