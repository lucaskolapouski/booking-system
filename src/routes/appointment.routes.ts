import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const appointmentRoutes = Router();
const appointmentController = new AppointmentController();

appointmentRoutes.post('/', ensureAuthenticated, appointmentController.create);

export { appointmentRoutes };