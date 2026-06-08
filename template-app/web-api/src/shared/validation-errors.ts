import type { Context } from "hono";

export const validationErrorAsJson = (
  result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } },
  c: Context
) => {
  if (result.success) return;

  const errors = Object.fromEntries(
    result.error?.issues.map((issue) => {
      const field = issue.path.join(".") || "request";
      return [field, issue.message];
    }) ?? [["request", "Invalid request"]]
  );

  return c.json({ errors }, 400);
};