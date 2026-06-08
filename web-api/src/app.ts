import { Hono } from 'hono';
import { parseDbError } from "@shared/db-errors.ts";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.onError((error, c) => {
  const dbError = parseDbError(error)
  if (dbError) {
    return c.json({
      error: dbError.message,
      code: dbError.statusCode,
    }, dbError.statusCode as ContentfulStatusCode)
  } else if (error instanceof HTTPException){
    return c.json({ error: error.message }, error.status);
  }
  console.error('Unexpected error:', error)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app;