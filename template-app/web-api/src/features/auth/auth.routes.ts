import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "./auth.schemas.ts";
import { validationErrorAsJson } from "@shared/validation-errors.ts";
import { RegisterUseCase } from "./usecases/register.usecase.ts";
import { respond } from "@shared/respond.ts";
import { pinoLogger } from "hono-pino";
import { appLogger } from "@shared/middleware/logger.middleware.ts";
import type { LoginUseCase } from "./usecases/login.usecase.ts";

export const makeAuthRoutes = (register: RegisterUseCase, login: LoginUseCase) => {

  const router = new Hono();
  router.use(pinoLogger({ pino: appLogger }))

  router.post('/register', zValidator('json', registerSchema, validationErrorAsJson), async c => {

    const body = c.req.valid('json');

    const result = await register.execute(body);
    return respond(c, result);
  });

  router.post('/login', zValidator('json', loginSchema), async c => {
    const { email, password } = c.req.valid('json');

    const result = await login.execute(email, password);
    return respond(c, result);
  });

  return router;

}