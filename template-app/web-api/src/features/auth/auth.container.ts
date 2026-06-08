import { db } from "@db/connection";
import { makeAuthQueries } from "./auth.queries.ts";
import { makeAuthRoutes } from "./auth.routes.ts";
import { RegisterUseCase } from "./usecases/register.usecase.ts";
import { LoginUseCase } from "./usecases/login.usecase.ts";

const authQueries = makeAuthQueries(db);

const register = new RegisterUseCase(authQueries);
const login = new LoginUseCase(authQueries);

const routes = makeAuthRoutes(register, login);
export default routes;