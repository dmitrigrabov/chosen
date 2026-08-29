import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postSpeedInsightsToggle } from "./handlers/toggle";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/speed-insights/toggle",
  validate("query", z.object({ projectId: z.string() })),
  validate("json", postSpeedInsightsToggleBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(await postSpeedInsightsToggle({ db, env: c.env, user: c.var.user, query, body }));
  },
);

export const postSpeedInsightsToggleBody = z.object({ value: z.boolean() });

export type PostSpeedInsightsToggleBody = { value: boolean };

export type PostSpeedInsightsToggleResponse = { value: boolean };

export type PostSpeedInsightsToggleInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { projectId: string };
  body: PostSpeedInsightsToggleBody;
};

export type PostSpeedInsightsToggleHandler = (
  input: PostSpeedInsightsToggleInput,
) => Promise<PostSpeedInsightsToggleResponse>;
