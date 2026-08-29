import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import { postProjectsIdOrNameTransferRequest } from "./handlers/{idOrName}";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.post(
  "/projects/:idOrName/transfer-request",
  validate("param", z.object({ idOrName: z.string() })),
  validate("query", z.object({ teamId: z.string().optional(), slug: z.string().optional() })),
  validate("json", postProjectsIdOrNameTransferRequestBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postProjectsIdOrNameTransferRequest({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
        body,
      }),
    );
  },
);

export const postProjectsIdOrNameTransferRequestBody = z.object({
  callbackUrl: z.string().optional(),
  callbackSecret: z.string().optional(),
});

export type PostProjectsIdOrNameTransferRequestBody = {
  callbackUrl?: string | undefined;
  callbackSecret?: string | undefined;
};

export type PostProjectsIdOrNameTransferRequestResponse = { code: string };

export type PostProjectsIdOrNameTransferRequestInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { idOrName: string };
  query: { teamId?: string | undefined; slug?: string | undefined };
  body: PostProjectsIdOrNameTransferRequestBody;
};

export type PostProjectsIdOrNameTransferRequestHandler = (
  input: PostProjectsIdOrNameTransferRequestInput,
) => Promise<PostProjectsIdOrNameTransferRequestResponse>;
