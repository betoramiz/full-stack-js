import { makeUserQueries } from './users.queries.ts';
import { db } from "@db/connection.ts";
import { CreateUser } from "./usecases/create.usecase.ts";
import { GetUserById } from "./usecases/getById.usecase.ts";
import { GetList } from "./usecases/list.usecase.ts";
import { makeUserRoutes } from "./users.routes.ts";

// create queries and use cases instances
const userQueries = makeUserQueries(db);
const createUser = new CreateUser(userQueries);
const getUserById = new GetUserById(userQueries);
const getList = new GetList(userQueries);

const routes = makeUserRoutes(createUser, getList, getUserById);

export default routes;
