import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.get('/', ensureAuthenticated, profileController.show);

export { profileRoutes };