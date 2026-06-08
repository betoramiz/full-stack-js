import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateUserSchema, getByIdSchema } from "./users.schemas.ts";
import { CreateUser } from "./usecases/create.usecase.ts";
import { GetList } from "./usecases/list.usecase.ts";
import { GetUserById } from "./usecases/getById.usecase.ts";
import { respond } from "@shared/respond.ts";
import { validationErrorAsJson } from "@shared/validation-errors.ts";
import { authMiddleware } from "@shared/middleware/auth.middleware.ts";
import { pinoLogger } from "hono-pino";
import { appLogger } from "@shared/middleware/logger.middleware.ts";



export const makeUserRoutes = (createUser:CreateUser,
                               getList: GetList,
                               getById: GetUserById) => {
  const router = new Hono();

  router.use('*', authMiddleware);
  router.use(pinoLogger({ pino: appLogger }))

  router.post('/', zValidator('json', CreateUserSchema, validationErrorAsJson), async (c) => {
    const body = c.req.valid("json");

    const result = await createUser.execute(body);
    return respond(c, result);
  });

  router.get('/list', async (c) => {
    const result = await getList.execute();
    return c.json(result, 200);
  })

  router.get('/:id', zValidator('param', getByIdSchema, validationErrorAsJson), async (c) => {
    const { id } = c.req.valid('param');
    const result = await getById.execute(id);
    return respond(c, result);
  })

  return router;
};
