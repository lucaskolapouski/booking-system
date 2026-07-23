import type { Appointment } from "@prisma/client";

export class AppointmentMapper {
    static toResponse(appointment: Appointment) {
        return {
            id: appointment.id,
            date: appointment.date,
            providerId: appointment.provider_id,
            customerId: appointment.customer_id,
            createdAt: appointment.created_at
        }
    }
}