import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { putDomainsDomainRecords } from "./handlers/{domain}";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.put(
  "/domains/:domain/records",
  validate("param", z.object({ domain: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await putDomainsDomainRecords({ db, env: c.env, user: c.var.user, params }));
  },
);

export type PutDomainsDomainRecordsResponse = { recordIds: Array<string> };

export type PutDomainsDomainRecordsInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: string };
};

export type PutDomainsDomainRecordsHandler = (
  input: PutDomainsDomainRecordsInput,
) => Promise<PutDomainsDomainRecordsResponse>;
