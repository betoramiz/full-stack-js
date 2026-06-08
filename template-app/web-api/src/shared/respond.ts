import { Context } from 'hono'
import type { Result } from "./result";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.ts";

export const respond = <T>(c: Context, result: Result<T, ErrorResponse>, statusCode = 200): Response =>
  result.ok
    ? c.json(result.value, statusCode as ContentfulStatusCode)
    : c.json({ error: result.error.message }, result.error.statusCode as ContentfulStatusCode)