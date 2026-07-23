import { Router } from "express";
import { ProviderController } from "../controllers/ProviderController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const providerRoutes = Router();
const providerController = new ProviderController();

providerRoutes.get('/', ensureAuthenticated, providerController.index);

export { providerRoutes }