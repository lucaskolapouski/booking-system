import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const sessionRoutes = Router();
const userController = new UserController();

sessionRoutes.post('/', userController.authenticate);

export { sessionRoutes };