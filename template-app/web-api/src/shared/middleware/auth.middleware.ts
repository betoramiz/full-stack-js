import { jwt } from 'hono/jwt';
import { envConfig } from "../../env.config.ts";

export const authMiddleware = jwt({
  secret: envConfig.SECRET,
  alg: "HS256"
});