import {
  type ConnectTriggerConfiguration,
  connectTriggerConfiguration,
} from "packages/models/src/connectTriggerConfiguration.generated.ts";
import {
  type ConnectTriggerDestination,
  connectTriggerDestination,
} from "packages/models/src/connectTriggerDestination.generated.ts";
import { z } from "zod";

export type ConnectConnectorCreateResult = {
  id: string;
  uid: string;
  defaultInstallationId?: string | undefined;
  createdAt: number;
  updatedAt: number;
  reinstallAt?: number | undefined;
  createdBy?:
    | (
        | { type: "user"; id: string }
        | {
            type: "project";
            id: string;
            environment: string | "development" | "preview" | "production";
          }
      )
    | undefined;
  updatedBy?:
    | (
        | { type: "user"; id: string }
        | {
            type: "project";
            id: string;
            environment: string | "development" | "preview" | "production";
          }
      )
    | undefined;
  creationMode?: ("managed" | "manual") | undefined;
  managed?: { sync?: boolean | undefined } | undefined;
  type:
    | "api-key"
    | "custom"
    | "discord"
    | "github"
    | "linear"
    | "linq"
    | "microsoft-entra"
    | "microsoft-teams"
    | "oauth"
    | "photon"
    | "salesforce"
    | "sendblue"
    | "slack"
    | "snowflake"
    | "snowflake-wif";
  service: string;
  connectionMethod?: string | undefined;
  target?: string | undefined;
  name: string;
  displayName: string;
  clientUrl?: (string | null) | undefined;
  redirectUri?: string | undefined;
  typeName: string;
  typeIcon?: string | undefined;
  website?: string | undefined;
  devsite?: string | undefined;
  docsite?: string | undefined;
  icon?: string | undefined;
  backgroundColor?: string | undefined;
  accentColor?: string | undefined;
  supportedSubjectTypes: Array<string>;
  appTokens?:
    | {
        crossInstallation: boolean;
        supportsRefinement: boolean;
        requiresReinstallation?: boolean | undefined;
        scopes?: Array<string> | undefined;
        supportedAuthorizationDetails?: Array<string> | undefined;
        permissionsUrl?: string | undefined;
      }
    | undefined;
  userTokens?:
    | {
        crossInstallation: boolean;
        supportsRefinement: boolean;
        scopes?: Array<string> | undefined;
        supportedAuthorizationDetails?: Array<string> | undefined;
        manualCredentialInput?: boolean | undefined;
      }
    | undefined;
  supportsInstallation: boolean;
  supportsRevocation: boolean;
  supportsTriggers: boolean;
  supportsIcon: unknown;
  triggers?: ConnectTriggerConfiguration | undefined;
  events?: Array<string> | undefined;
  triggerDestinations?: Array<ConnectTriggerDestination> | undefined;
};

export const connectConnectorCreateResult = z.object({
  id: z.string(),
  uid: z.string(),
  defaultInstallationId: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  reinstallAt: z.number().optional(),
  createdBy: z
    .union([
      z.object({ type: z.literal("user"), id: z.string() }),
      z.object({
        type: z.literal("project"),
        id: z.string(),
        environment: z.union([z.string(), z.enum(["development", "preview", "production"])]),
      }),
    ])
    .optional(),
  updatedBy: z
    .union([
      z.object({ type: z.literal("user"), id: z.string() }),
      z.object({
        type: z.literal("project"),
        id: z.string(),
        environment: z.union([z.string(), z.enum(["development", "preview", "production"])]),
      }),
    ])
    .optional(),
  creationMode: z.enum(["managed", "manual"]).optional(),
  managed: z.object({ sync: z.boolean().optional() }).optional(),
  type: z.enum([
    "api-key",
    "custom",
    "discord",
    "github",
    "linear",
    "linq",
    "microsoft-entra",
    "microsoft-teams",
    "oauth",
    "photon",
    "salesforce",
    "sendblue",
    "slack",
    "snowflake",
    "snowflake-wif",
  ]),
  service: z.string(),
  connectionMethod: z.string().optional(),
  target: z.string().optional(),
  name: z.string(),
  displayName: z.string(),
  clientUrl: z.string().nullable().optional(),
  redirectUri: z.string().optional(),
  typeName: z.string(),
  typeIcon: z.string().optional(),
  website: z.string().optional(),
  devsite: z.string().optional(),
  docsite: z.string().optional(),
  icon: z.string().optional(),
  backgroundColor: z.string().optional(),
  accentColor: z.string().optional(),
  supportedSubjectTypes: z.array(z.string()),
  appTokens: z
    .object({
      crossInstallation: z.boolean(),
      supportsRefinement: z.boolean(),
      requiresReinstallation: z.boolean().optional(),
      scopes: z.array(z.string()).optional(),
      supportedAuthorizationDetails: z.array(z.string()).optional(),
      permissionsUrl: z.string().optional(),
    })
    .optional(),
  userTokens: z
    .object({
      crossInstallation: z.boolean(),
      supportsRefinement: z.boolean(),
      scopes: z.array(z.string()).optional(),
      supportedAuthorizationDetails: z.array(z.string()).optional(),
      manualCredentialInput: z.boolean().optional(),
    })
    .optional(),
  supportsInstallation: z.boolean(),
  supportsRevocation: z.boolean(),
  supportsTriggers: z.boolean(),
  supportsIcon: z.unknown(),
  triggers: connectTriggerConfiguration.optional(),
  events: z.array(z.string()).optional(),
  triggerDestinations: z.array(connectTriggerDestination).optional(),
});
