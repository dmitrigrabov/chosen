import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postWebInsightsToggle } from "./handlers/insights";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/web/insights/toggle",
  validate("query", z.object({ projectId: z.string() })),
  validate("json", postWebInsightsToggleBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postWebInsightsToggle({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export const postWebInsightsToggleBody = z.object({ value: z.boolean() });

export type PostWebInsightsToggleBody = { value: boolean };

export type PostWebInsightsToggleResponse = { value: boolean };

export type PostWebInsightsToggleInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string };
  body: PostWebInsightsToggleBody;
};

export type PostWebInsightsToggleHandler = (
  input: PostWebInsightsToggleInput,
) => Promise<PostWebInsightsToggleResponse>;
