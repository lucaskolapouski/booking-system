import type { Request, Response } from 'express';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository.js';
import { PrismaAppointmentRepository } from '../repositories/prisma/PrismaAppointmentRepository.js';
import { CreateAppointmentService } from '../services/CreateAppointmentService.js';
import { AppointmentMapper } from '../mappers/AppointmentMapper.js';

export class AppointmentController {
    async create(req: Request, res: Response) {
        try {

            const { provider_id, date } = req.body;

            const userRepository = new PrismaUserRepository();
            const appointmentRepository = new PrismaAppointmentRepository();
            const createAppointmentService = new CreateAppointmentService(appointmentRepository, userRepository);

            const appointment = await createAppointmentService.execute(
                provider_id,
                req.user.id,
                new Date(date)
            )

            return res.status(201).json(AppointmentMapper.toResponse(appointment));

        } catch (error: any) {

            return res.status(400).json({ error: error.message });

        }
    }
}