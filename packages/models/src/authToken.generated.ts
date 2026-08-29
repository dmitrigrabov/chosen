import { z } from "zod";

export type AuthToken = {
  id: string;
  name: string;
  type: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  origin?: string | undefined;
  scopes?:
    | Array<
        | {
            type: "user";
            sudo?:
              | {
                  origin: "email-otp" | "otp" | "recovery-code" | "totp" | "webauthn";
                  verifiedAt?: number | undefined;
                  expiresAt: number;
                }
              | undefined;
            origin?:
              | (
                  | "app"
                  | "apple"
                  | "bitbucket"
                  | "chatgpt"
                  | "email"
                  | "emu"
                  | "github"
                  | "github-webhook"
                  | "gitlab"
                  | "google"
                  | "invite"
                  | "manual"
                  | "otp"
                  | "passkey"
                  | "saml"
                  | "sms"
                  | "token-exchange-oidc"
                )
              | undefined;
            createdAt: number;
            expiresAt?: number | undefined;
          }
        | {
            type: "team";
            teamId: string;
            origin?:
              | (
                  | "app"
                  | "apple"
                  | "bitbucket"
                  | "chatgpt"
                  | "email"
                  | "emu"
                  | "github"
                  | "github-webhook"
                  | "gitlab"
                  | "google"
                  | "invite"
                  | "manual"
                  | "otp"
                  | "passkey"
                  | "saml"
                  | "sms"
                  | "token-exchange-oidc"
                )
              | undefined;
            createdAt: number;
            expiresAt?: number | undefined;
          }
      >
    | undefined;
  createdAt: number;
  activeAt: number;
  expiresAt?: number | undefined;
  revokedAt?: number | undefined;
  leakedAt?: number | undefined;
  leakedUrl?: string | undefined;
};

export const authToken = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  origin: z.string().optional(),
  scopes: z
    .array(
      z.union([
        z.object({
          type: z.literal("user"),
          sudo: z
            .object({
              origin: z.enum(["email-otp", "otp", "recovery-code", "totp", "webauthn"]),
              verifiedAt: z.number().optional(),
              expiresAt: z.number(),
            })
            .optional(),
          origin: z
            .enum([
              "app",
              "apple",
              "bitbucket",
              "chatgpt",
              "email",
              "emu",
              "github",
              "github-webhook",
              "gitlab",
              "google",
              "invite",
              "manual",
              "otp",
              "passkey",
              "saml",
              "sms",
              "token-exchange-oidc",
            ])
            .optional(),
          createdAt: z.number(),
          expiresAt: z.number().optional(),
        }),
        z.object({
          type: z.literal("team"),
          teamId: z.string(),
          origin: z
            .enum([
              "app",
              "apple",
              "bitbucket",
              "chatgpt",
              "email",
              "emu",
              "github",
              "github-webhook",
              "gitlab",
              "google",
              "invite",
              "manual",
              "otp",
              "passkey",
              "saml",
              "sms",
              "token-exchange-oidc",
            ])
            .optional(),
          createdAt: z.number(),
          expiresAt: z.number().optional(),
        }),
      ]),
    )
    .optional(),
  createdAt: z.number(),
  activeAt: z.number(),
  expiresAt: z.number().optional(),
  revokedAt: z.number().optional(),
  leakedAt: z.number().optional(),
  leakedUrl: z.string().optional(),
});
