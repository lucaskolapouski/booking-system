import { Router } from "express";
import { SessionController } from "../controllers/SessionController.js";

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/', sessionController.authenticate);

export { sessionRoutes };