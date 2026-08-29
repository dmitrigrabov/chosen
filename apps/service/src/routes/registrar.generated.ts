import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1RegistrarTldsSupported,
  getV1RegistrarTldsTld,
  getV1RegistrarTldsTldPrice,
  getV1RegistrarDomainsDomainAvailability,
  getV1RegistrarDomainsDomainPrice,
  postV1RegistrarDomainsAvailability,
  getV1RegistrarDomainsDomainAuthCode,
  postV1RegistrarDomainsDomainBuy,
  postV1RegistrarDomainsBuy,
  postV1RegistrarDomainsDomainTransfer,
  getV1RegistrarDomainsDomainTransfer,
  postV1RegistrarDomainsDomainRenew,
  patchV1RegistrarDomainsDomainAutoRenew,
  patchV1RegistrarDomainsDomainNameservers,
  getV1RegistrarDomainsDomainContactVerification,
  getV1RegistrarDomainsDomainContactInfoSchema,
  getV1RegistrarOrdersOrderId,
} from "./handlers/registrar";
import { type TldName, tldName } from "packages/models/src/tldName.generated.ts";
import { domainName, type DomainName } from "packages/models/src/domainName.generated.ts";
import {
  nonEmptyTrimmedString,
  type NonEmptyTrimmedString,
} from "packages/models/src/nonEmptyTrimmedString.generated.ts";
import { emailAddress, type EmailAddress } from "packages/models/src/emailAddress.generated.ts";
import {
  e164PhoneNumber,
  type E164PhoneNumber,
} from "packages/models/src/e164PhoneNumber.generated.ts";
import { countryCode, type CountryCode } from "packages/models/src/countryCode.generated.ts";
import { type OrderId, orderId } from "packages/models/src/orderId.generated.ts";
import { nameserver, type Nameserver } from "packages/models/src/nameserver.generated.ts";
import type { ContactVerified } from "packages/models/src/contactVerified.generated.ts";
import type { ContactPendingVerification } from "packages/models/src/contactPendingVerification.generated.ts";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/registrar/tlds/supported",
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(await getV1RegistrarTldsSupported({ db, env: c.env, user: c.var.user, query }));
  },
);
app.get(
  "/v1/registrar/tlds/:tld",
  validate("param", z.object({ tld: tldName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(await getV1RegistrarTldsTld({ db, env: c.env, user: c.var.user, params, query }));
  },
);
app.get(
  "/v1/registrar/tlds/:tld/price",
  validate("param", z.object({ tld: tldName })),
  validate("query", z.object({ years: z.string().optional(), teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarTldsTldPrice({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.get(
  "/v1/registrar/domains/:domain/availability",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainAvailability({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v1/registrar/domains/:domain/price",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ years: z.string().optional(), teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainPrice({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);
app.post(
  "/v1/registrar/domains/availability",
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", postV1RegistrarDomainsAvailabilityBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1RegistrarDomainsAvailability({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.get(
  "/v1/registrar/domains/:domain/auth-code",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainAuthCode({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v1/registrar/domains/:domain/buy",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", postV1RegistrarDomainsDomainBuyBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1RegistrarDomainsDomainBuy({
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
app.post(
  "/v1/registrar/domains/buy",
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", postV1RegistrarDomainsBuyBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1RegistrarDomainsBuy({ db, env: c.env, user: c.var.user, query, body }),
    );
  },
);
app.post(
  "/v1/registrar/domains/:domain/transfer",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", postV1RegistrarDomainsDomainTransferBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1RegistrarDomainsDomainTransfer({
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
app.get(
  "/v1/registrar/domains/:domain/transfer",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainTransfer({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.post(
  "/v1/registrar/domains/:domain/renew",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", postV1RegistrarDomainsDomainRenewBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    return c.json(
      await postV1RegistrarDomainsDomainRenew({
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
app.patch(
  "/v1/registrar/domains/:domain/auto-renew",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", patchV1RegistrarDomainsDomainAutoRenewBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    await patchV1RegistrarDomainsDomainAutoRenew({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
      body,
    });
    return c.body(null, 204);
  },
);
app.patch(
  "/v1/registrar/domains/:domain/nameservers",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  validate("json", patchV1RegistrarDomainsDomainNameserversBody),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    await patchV1RegistrarDomainsDomainNameservers({
      db,
      env: c.env,
      user: c.var.user,
      params,
      query,
      body,
    });
    return c.body(null, 204);
  },
);
app.get(
  "/v1/registrar/domains/:domain/contact-verification",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainContactVerification({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v1/registrar/domains/:domain/contact-info/schema",
  validate("param", z.object({ domain: domainName })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarDomainsDomainContactInfoSchema({
        db,
        env: c.env,
        user: c.var.user,
        params,
        query,
      }),
    );
  },
);
app.get(
  "/v1/registrar/orders/:orderId",
  validate("param", z.object({ orderId: orderId })),
  validate("query", z.object({ teamId: z.string().optional() })),
  async (c) => {
    const db = createDb(c.env.DB);
    const params = c.req.valid("param");
    const query = c.req.valid("query");
    return c.json(
      await getV1RegistrarOrdersOrderId({ db, env: c.env, user: c.var.user, params, query }),
    );
  },
);

export type GetV1RegistrarTldsSupportedResponse = Array<TldName>;

export type GetV1RegistrarTldsSupportedInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarTldsSupportedHandler = (
  input: GetV1RegistrarTldsSupportedInput,
) => Promise<GetV1RegistrarTldsSupportedResponse>;

export type GetV1RegistrarTldsTldResponse = { supportedLanguageCodes: Record<string, string> };

export type GetV1RegistrarTldsTldInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { tld: TldName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarTldsTldHandler = (
  input: GetV1RegistrarTldsTldInput,
) => Promise<GetV1RegistrarTldsTldResponse>;

export type GetV1RegistrarTldsTldPriceResponse = {
  years: number;
  purchasePrice: number | string;
  renewalPrice: number | string;
  transferPrice: number | string;
};

export type GetV1RegistrarTldsTldPriceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { tld: TldName };
  query: { years?: string | undefined; teamId?: string | undefined };
};

export type GetV1RegistrarTldsTldPriceHandler = (
  input: GetV1RegistrarTldsTldPriceInput,
) => Promise<GetV1RegistrarTldsTldPriceResponse>;

export type GetV1RegistrarDomainsDomainAvailabilityResponse = { available: boolean };

export type GetV1RegistrarDomainsDomainAvailabilityInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainAvailabilityHandler = (
  input: GetV1RegistrarDomainsDomainAvailabilityInput,
) => Promise<GetV1RegistrarDomainsDomainAvailabilityResponse>;

export type GetV1RegistrarDomainsDomainPriceResponse = {
  years: number;
  purchasePrice: number | string;
  renewalPrice: number | string;
  transferPrice: number | string;
};

export type GetV1RegistrarDomainsDomainPriceInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { years?: string | undefined; teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainPriceHandler = (
  input: GetV1RegistrarDomainsDomainPriceInput,
) => Promise<GetV1RegistrarDomainsDomainPriceResponse>;

export const postV1RegistrarDomainsAvailabilityBody = z.object({ domains: z.array(domainName) });

export type PostV1RegistrarDomainsAvailabilityBody = { domains: Array<DomainName> };

export type PostV1RegistrarDomainsAvailabilityResponse = {
  results: Array<{ domain: DomainName; available: boolean }>;
};

export type PostV1RegistrarDomainsAvailabilityInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined };
  body: PostV1RegistrarDomainsAvailabilityBody;
};

export type PostV1RegistrarDomainsAvailabilityHandler = (
  input: PostV1RegistrarDomainsAvailabilityInput,
) => Promise<PostV1RegistrarDomainsAvailabilityResponse>;

export type GetV1RegistrarDomainsDomainAuthCodeResponse = { authCode: string };

export type GetV1RegistrarDomainsDomainAuthCodeInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainAuthCodeHandler = (
  input: GetV1RegistrarDomainsDomainAuthCodeInput,
) => Promise<GetV1RegistrarDomainsDomainAuthCodeResponse>;

export const postV1RegistrarDomainsDomainBuyBody = z.object({
  autoRenew: z.boolean(),
  years: z.number(),
  expectedPrice: z.number().gte(0.01),
  contactInformation: z.object({
    firstName: nonEmptyTrimmedString,
    lastName: nonEmptyTrimmedString,
    email: emailAddress,
    phone: e164PhoneNumber,
    address1: nonEmptyTrimmedString,
    address2: nonEmptyTrimmedString.optional(),
    city: nonEmptyTrimmedString,
    state: nonEmptyTrimmedString,
    zip: nonEmptyTrimmedString,
    country: countryCode,
    companyName: nonEmptyTrimmedString.optional(),
    fax: e164PhoneNumber.optional(),
    additional: z.object({}).optional(),
  }),
  languageCode: z.string().optional(),
});

export type PostV1RegistrarDomainsDomainBuyBody = {
  autoRenew: boolean;
  years: number;
  expectedPrice: number;
  contactInformation: {
    firstName: NonEmptyTrimmedString;
    lastName: NonEmptyTrimmedString;
    email: EmailAddress;
    phone: E164PhoneNumber;
    address1: NonEmptyTrimmedString;
    address2?: NonEmptyTrimmedString | undefined;
    city: NonEmptyTrimmedString;
    state: NonEmptyTrimmedString;
    zip: NonEmptyTrimmedString;
    country: CountryCode;
    companyName?: NonEmptyTrimmedString | undefined;
    fax?: E164PhoneNumber | undefined;
    additional?: Record<string, never> | undefined;
  };
  languageCode?: string | undefined;
};

export type PostV1RegistrarDomainsDomainBuyResponse = {
  orderId: OrderId;
  _links: Record<string, { href: string; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }>;
};

export type PostV1RegistrarDomainsDomainBuyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
  body: PostV1RegistrarDomainsDomainBuyBody;
};

export type PostV1RegistrarDomainsDomainBuyHandler = (
  input: PostV1RegistrarDomainsDomainBuyInput,
) => Promise<PostV1RegistrarDomainsDomainBuyResponse>;

export const postV1RegistrarDomainsBuyBody = z.object({
  domains: z.array(
    z.object({
      domainName: domainName,
      autoRenew: z.boolean(),
      years: z.number(),
      expectedPrice: z.number().gte(0.01),
      languageCode: z.string().optional(),
    }),
  ),
  contactInformation: z.object({
    firstName: nonEmptyTrimmedString,
    lastName: nonEmptyTrimmedString,
    email: emailAddress,
    phone: e164PhoneNumber,
    address1: nonEmptyTrimmedString,
    address2: nonEmptyTrimmedString.optional(),
    city: nonEmptyTrimmedString,
    state: nonEmptyTrimmedString,
    zip: nonEmptyTrimmedString,
    country: countryCode,
    companyName: nonEmptyTrimmedString.optional(),
    fax: e164PhoneNumber.optional(),
    additional: z.object({}).optional(),
  }),
});

export type PostV1RegistrarDomainsBuyBody = {
  domains: Array<{
    domainName: DomainName;
    autoRenew: boolean;
    years: number;
    expectedPrice: number;
    languageCode?: string | undefined;
  }>;
  contactInformation: {
    firstName: NonEmptyTrimmedString;
    lastName: NonEmptyTrimmedString;
    email: EmailAddress;
    phone: E164PhoneNumber;
    address1: NonEmptyTrimmedString;
    address2?: NonEmptyTrimmedString | undefined;
    city: NonEmptyTrimmedString;
    state: NonEmptyTrimmedString;
    zip: NonEmptyTrimmedString;
    country: CountryCode;
    companyName?: NonEmptyTrimmedString | undefined;
    fax?: E164PhoneNumber | undefined;
    additional?: Record<string, never> | undefined;
  };
};

export type PostV1RegistrarDomainsBuyResponse = {
  orderId: OrderId;
  _links: Record<string, { href: string; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }>;
};

export type PostV1RegistrarDomainsBuyInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: { teamId?: string | undefined };
  body: PostV1RegistrarDomainsBuyBody;
};

export type PostV1RegistrarDomainsBuyHandler = (
  input: PostV1RegistrarDomainsBuyInput,
) => Promise<PostV1RegistrarDomainsBuyResponse>;

export const postV1RegistrarDomainsDomainTransferBody = z.object({
  authCode: z.string(),
  autoRenew: z.boolean(),
  years: z.number(),
  expectedPrice: z.number().gte(0.01),
  contactInformation: z.object({
    firstName: nonEmptyTrimmedString,
    lastName: nonEmptyTrimmedString,
    email: emailAddress,
    phone: e164PhoneNumber,
    address1: nonEmptyTrimmedString,
    address2: nonEmptyTrimmedString.optional(),
    city: nonEmptyTrimmedString,
    state: nonEmptyTrimmedString,
    zip: nonEmptyTrimmedString,
    country: countryCode,
    companyName: nonEmptyTrimmedString.optional(),
    fax: e164PhoneNumber.optional(),
  }),
});

export type PostV1RegistrarDomainsDomainTransferBody = {
  authCode: string;
  autoRenew: boolean;
  years: number;
  expectedPrice: number;
  contactInformation: {
    firstName: NonEmptyTrimmedString;
    lastName: NonEmptyTrimmedString;
    email: EmailAddress;
    phone: E164PhoneNumber;
    address1: NonEmptyTrimmedString;
    address2?: NonEmptyTrimmedString | undefined;
    city: NonEmptyTrimmedString;
    state: NonEmptyTrimmedString;
    zip: NonEmptyTrimmedString;
    country: CountryCode;
    companyName?: NonEmptyTrimmedString | undefined;
    fax?: E164PhoneNumber | undefined;
  };
};

export type PostV1RegistrarDomainsDomainTransferResponse = {
  orderId: OrderId;
  _links: Record<string, { href: string; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }>;
};

export type PostV1RegistrarDomainsDomainTransferInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
  body: PostV1RegistrarDomainsDomainTransferBody;
};

export type PostV1RegistrarDomainsDomainTransferHandler = (
  input: PostV1RegistrarDomainsDomainTransferInput,
) => Promise<PostV1RegistrarDomainsDomainTransferResponse>;

export type GetV1RegistrarDomainsDomainTransferResponse = {
  status:
    | "canceled"
    | "canceled_pending_refund"
    | "completed"
    | "created"
    | "failed"
    | "pending"
    | "pending_insert"
    | "pending_new_auth_code"
    | "pending_transfer"
    | "pending_unlock"
    | "pending_registry_unlock"
    | "rejected"
    | "submitting_transfer";
};

export type GetV1RegistrarDomainsDomainTransferInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainTransferHandler = (
  input: GetV1RegistrarDomainsDomainTransferInput,
) => Promise<GetV1RegistrarDomainsDomainTransferResponse>;

export const postV1RegistrarDomainsDomainRenewBody = z.object({
  years: z.number(),
  expectedPrice: z.number().gte(0.01),
  contactInformation: z
    .object({
      firstName: nonEmptyTrimmedString,
      lastName: nonEmptyTrimmedString,
      email: emailAddress,
      phone: e164PhoneNumber,
      address1: nonEmptyTrimmedString,
      address2: nonEmptyTrimmedString.optional(),
      city: nonEmptyTrimmedString,
      state: nonEmptyTrimmedString,
      zip: nonEmptyTrimmedString,
      country: countryCode,
      companyName: nonEmptyTrimmedString.optional(),
      fax: e164PhoneNumber.optional(),
    })
    .optional(),
});

export type PostV1RegistrarDomainsDomainRenewBody = {
  years: number;
  expectedPrice: number;
  contactInformation?:
    | {
        firstName: NonEmptyTrimmedString;
        lastName: NonEmptyTrimmedString;
        email: EmailAddress;
        phone: E164PhoneNumber;
        address1: NonEmptyTrimmedString;
        address2?: NonEmptyTrimmedString | undefined;
        city: NonEmptyTrimmedString;
        state: NonEmptyTrimmedString;
        zip: NonEmptyTrimmedString;
        country: CountryCode;
        companyName?: NonEmptyTrimmedString | undefined;
        fax?: E164PhoneNumber | undefined;
      }
    | undefined;
};

export type PostV1RegistrarDomainsDomainRenewResponse = {
  orderId: OrderId;
  _links: Record<string, { href: string; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }>;
};

export type PostV1RegistrarDomainsDomainRenewInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
  body: PostV1RegistrarDomainsDomainRenewBody;
};

export type PostV1RegistrarDomainsDomainRenewHandler = (
  input: PostV1RegistrarDomainsDomainRenewInput,
) => Promise<PostV1RegistrarDomainsDomainRenewResponse>;

export const patchV1RegistrarDomainsDomainAutoRenewBody = z.object({ autoRenew: z.boolean() });

export type PatchV1RegistrarDomainsDomainAutoRenewBody = { autoRenew: boolean };

export type PatchV1RegistrarDomainsDomainAutoRenewInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
  body: PatchV1RegistrarDomainsDomainAutoRenewBody;
};

export type PatchV1RegistrarDomainsDomainAutoRenewHandler = (
  input: PatchV1RegistrarDomainsDomainAutoRenewInput,
) => Promise<void>;

export const patchV1RegistrarDomainsDomainNameserversBody = z.object({
  nameservers: z.array(nameserver),
});

export type PatchV1RegistrarDomainsDomainNameserversBody = { nameservers: Array<Nameserver> };

export type PatchV1RegistrarDomainsDomainNameserversInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
  body: PatchV1RegistrarDomainsDomainNameserversBody;
};

export type PatchV1RegistrarDomainsDomainNameserversHandler = (
  input: PatchV1RegistrarDomainsDomainNameserversInput,
) => Promise<void>;

export type GetV1RegistrarDomainsDomainContactVerificationResponse =
  | ContactVerified
  | ContactPendingVerification;

export type GetV1RegistrarDomainsDomainContactVerificationInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainContactVerificationHandler = (
  input: GetV1RegistrarDomainsDomainContactVerificationInput,
) => Promise<GetV1RegistrarDomainsDomainContactVerificationResponse>;

export type GetV1RegistrarDomainsDomainContactInfoSchemaResponse = Record<string, never>;

export type GetV1RegistrarDomainsDomainContactInfoSchemaInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { domain: DomainName };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarDomainsDomainContactInfoSchemaHandler = (
  input: GetV1RegistrarDomainsDomainContactInfoSchemaInput,
) => Promise<GetV1RegistrarDomainsDomainContactInfoSchemaResponse>;

export type GetV1RegistrarOrdersOrderIdResponse = {
  orderId: OrderId;
  domains: Array<
    | {
        purchaseType: "purchase";
        autoRenew: boolean;
        years: number;
        domainName: DomainName;
        status: "pending" | "completed" | "failed" | "refunded" | "refund-failed";
        price: number;
        error?:
          | (
              | { code: "unsupported-language-code"; details: { detectedLanguageCode: string } }
              | { code: "incorrect-language-code"; details: { detectedLanguageCode: string } }
              | { code: "client-transfer-prohibited" }
              | { code: "incorrect-auth-code" }
              | { code: "claims-notice-required" }
              | { code: "cannot-transfer-in-until"; details: { numDaysUntilTransferrable: number } }
              | { code: "account-transfer-required" }
              | { code: "price-change" }
              | { code: "unavailable-legal" }
              | {
                  code: "invalid-contact";
                  details: {
                    invalidField?:
                      | (
                          | "firstName"
                          | "lastName"
                          | "email"
                          | "phone"
                          | "address1"
                          | "address2"
                          | "city"
                          | "state"
                          | "zip"
                          | "country"
                          | "companyName"
                          | "fax"
                        )
                      | undefined;
                  };
                }
              | { code: string; details: unknown }
            )
          | undefined;
      }
    | {
        purchaseType: "renewal";
        years: number;
        domainName: DomainName;
        status: "pending" | "completed" | "failed" | "refunded" | "refund-failed";
        price: number;
        error?:
          | (
              | { code: "unsupported-language-code"; details: { detectedLanguageCode: string } }
              | { code: "incorrect-language-code"; details: { detectedLanguageCode: string } }
              | { code: "client-transfer-prohibited" }
              | { code: "incorrect-auth-code" }
              | { code: "claims-notice-required" }
              | { code: "cannot-transfer-in-until"; details: { numDaysUntilTransferrable: number } }
              | { code: "account-transfer-required" }
              | { code: "price-change" }
              | { code: "unavailable-legal" }
              | {
                  code: "invalid-contact";
                  details: {
                    invalidField?:
                      | (
                          | "firstName"
                          | "lastName"
                          | "email"
                          | "phone"
                          | "address1"
                          | "address2"
                          | "city"
                          | "state"
                          | "zip"
                          | "country"
                          | "companyName"
                          | "fax"
                        )
                      | undefined;
                  };
                }
              | { code: string; details: unknown }
            )
          | undefined;
      }
    | {
        purchaseType: "transfer";
        autoRenew: boolean;
        years: number;
        domainName: DomainName;
        status: "pending" | "completed" | "failed" | "refunded" | "refund-failed";
        price: number;
        error?:
          | (
              | { code: "unsupported-language-code"; details: { detectedLanguageCode: string } }
              | { code: "incorrect-language-code"; details: { detectedLanguageCode: string } }
              | { code: "client-transfer-prohibited" }
              | { code: "incorrect-auth-code" }
              | { code: "claims-notice-required" }
              | { code: "cannot-transfer-in-until"; details: { numDaysUntilTransferrable: number } }
              | { code: "account-transfer-required" }
              | { code: "price-change" }
              | { code: "unavailable-legal" }
              | {
                  code: "invalid-contact";
                  details: {
                    invalidField?:
                      | (
                          | "firstName"
                          | "lastName"
                          | "email"
                          | "phone"
                          | "address1"
                          | "address2"
                          | "city"
                          | "state"
                          | "zip"
                          | "country"
                          | "companyName"
                          | "fax"
                        )
                      | undefined;
                  };
                }
              | { code: string; details: unknown }
            )
          | undefined;
      }
  >;
  status: "draft" | "purchasing" | "completed" | "failed";
  error?:
    | (
        | { code: "payment-failed" }
        | { code: "tld-outage"; details: { tlds: Array<{ tldName: string; endsAt: string }> } }
        | {
            code: "price-mismatch";
            details: { expectedPrice: number; actualPrice?: number | undefined };
          }
        | { code: "unexpected-error" }
        | { code: "claims-required"; details: { message: string; domainNames: Array<string> } }
        | { code: "domain-mismatch" }
        | { code: string; details: unknown }
      )
    | undefined;
};

export type GetV1RegistrarOrdersOrderIdInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  params: { orderId: OrderId };
  query: { teamId?: string | undefined };
};

export type GetV1RegistrarOrdersOrderIdHandler = (
  input: GetV1RegistrarOrdersOrderIdInput,
) => Promise<GetV1RegistrarOrdersOrderIdResponse>;
