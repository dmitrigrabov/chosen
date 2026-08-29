import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getV3Events, getV1EventsTypes } from "./handlers/events";
import type { UserEvent } from "packages/models/src/userEvent.generated.ts";
import type { ListEventTypesResponse } from "packages/models/src/listEventTypesResponse.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v3/events",
  validate(
    "query",
    z.object({
      limit: z.coerce.number().optional(),
      since: z.string().optional(),
      until: z.string().optional(),
      types: z.string().optional(),
      userId: z.string().optional(),
      principalId: z.string().optional(),
      projectIds: z.string().optional(),
      entityId: z.string().optional(),
      withPayload: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV3Events({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/events/types",
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1EventsTypes({ db, env: c.env, user: c.var.user, query }));
  },
);

export type GetV3EventsResponse = { events: Array<UserEvent> };

export type GetV3EventsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    limit?: number | undefined;
    since?: string | undefined;
    until?: string | undefined;
    types?: string | undefined;
    userId?: string | undefined;
    principalId?: string | undefined;
    projectIds?: string | undefined;
    entityId?: string | undefined;
    withPayload?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV3EventsHandler = (input: GetV3EventsInput) => Promise<GetV3EventsResponse>;

export type GetV1EventsTypesInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined; slug?: string | undefined };
};

export type GetV1EventsTypesHandler = (
  input: GetV1EventsTypesInput,
) => Promise<ListEventTypesResponse>;
