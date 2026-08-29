import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { getDomainsRecordsRecordId } from "./handlers/records";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/domains/records/:recordId",
  validate("param", z.object({ recordId: z.string() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    return c.json(await getDomainsRecordsRecordId({ db, env: c.env, user: c.var.user, params }));
  },
);

export type GetDomainsRecordsRecordIdResponse = {
  type: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
  id: string;
  name: string;
  value: string;
  creator: string;
  domain: string;
  ttl?: number | undefined;
  comment?: string | undefined;
  recordType: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
  createdAt?: (number | null) | undefined;
};

export type GetDomainsRecordsRecordIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { recordId: string };
};

export type GetDomainsRecordsRecordIdHandler = (
  input: GetDomainsRecordsRecordIdInput,
) => Promise<GetDomainsRecordsRecordIdResponse>;
