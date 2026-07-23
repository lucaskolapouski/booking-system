import express from 'express';
import { userRoutes } from './routes/user.routes.js';
import { sessionRoutes } from './routes/session.routes.js';
import { profileRoutes } from './routes/profile.routes.js';
import { appointmentRoutes } from './routes/appointment.routes.js';
import { providerRoutes } from './routes/provider.routes.js';

const app = express();

app.use(express.json());

app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/providers', providerRoutes);

export { app }