import app from './app';
import { envConfig } from "./env.config.ts";
import userRoutes from "./features/users/users.container.ts";
import authRoutes from "./features/auth/auth.container.ts";

app.route('/users', userRoutes);
app.route('/auth', authRoutes);

export default {
  port: envConfig.PORT,
  fetch: app.fetch,
};