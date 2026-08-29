import {
  type ConnectConnectorCreateData,
  connectConnectorCreateData,
} from "packages/models/src/connectConnectorCreateData.generated.ts";
import { z } from "zod";

export type ConnectCreateConnectorRequest =
  | {
      data: ConnectConnectorCreateData;
      icon?: string | undefined;
      backgroundColor?: string | undefined;
      accentColor?: string | undefined;
      type: string;
      service?: string | undefined;
      connectionMethod?: string | undefined;
      params?: Record<string, string> | undefined;
      target?: string | undefined;
      uid?: string | undefined;
      name?: string | undefined;
      projectId?: string | undefined;
      environments?: Array<"development" | "preview" | "production" | string> | undefined;
      triggers?: boolean | undefined;
      triggerDestination?:
        | (
            | { projectId?: string | undefined; path?: string | undefined }
            | { projectId?: string | undefined; branch: string; path?: string | undefined }
            | {
                projectId?: string | undefined;
                customEnvironmentId: string;
                path?: string | undefined;
              }
          )
        | undefined;
      events?: Array<string> | undefined;
    }
  | {
      data: ConnectConnectorCreateData;
      icon?: string | undefined;
      backgroundColor?: string | undefined;
      accentColor?: string | undefined;
      type?: string | undefined;
      service: string;
      connectionMethod: string;
      params?: Record<string, string> | undefined;
      target?: string | undefined;
      uid?: string | undefined;
      name?: string | undefined;
      projectId?: string | undefined;
      environments?: Array<"development" | "preview" | "production" | string> | undefined;
      triggers?: boolean | undefined;
      triggerDestination?:
        | (
            | { projectId?: string | undefined; path?: string | undefined }
            | { projectId?: string | undefined; branch: string; path?: string | undefined }
            | {
                projectId?: string | undefined;
                customEnvironmentId: string;
                path?: string | undefined;
              }
          )
        | undefined;
      events?: Array<string> | undefined;
    };

export const connectCreateConnectorRequest = z.union([
  z.object({
    data: connectConnectorCreateData,
    icon: z
      .string()
      .regex(/^[0-9a-fA-F]{40}$/)
      .optional(),
    backgroundColor: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    accentColor: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    type: z.string(),
    service: z.string().optional(),
    connectionMethod: z.string().max(64).optional(),
    params: z.record(z.string(), z.string().max(256)).optional(),
    target: z.string().max(64).optional(),
    uid: z.string().optional(),
    name: z.string().optional(),
    projectId: z.string().optional(),
    environments: z
      .array(z.union([z.enum(["development", "preview", "production"]), z.string().regex(/^env_/)]))
      .optional(),
    triggers: z.boolean().optional(),
    triggerDestination: z
      .union([
        z.object({
          projectId: z.string().min(1).optional(),
          path: z.string().min(1).max(2048).optional(),
        }),
        z.object({
          projectId: z.string().min(1).optional(),
          branch: z.string().min(1).max(250),
          path: z.string().min(1).max(2048).optional(),
        }),
        z.object({
          projectId: z.string().min(1).optional(),
          customEnvironmentId: z.string().regex(/^env_/),
          path: z.string().min(1).max(2048).optional(),
        }),
      ])
      .optional(),
    events: z.array(z.string()).optional(),
  }),
  z.object({
    data: connectConnectorCreateData,
    icon: z
      .string()
      .regex(/^[0-9a-fA-F]{40}$/)
      .optional(),
    backgroundColor: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    accentColor: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    type: z.string().optional(),
    service: z.string(),
    connectionMethod: z.string().max(64),
    params: z.record(z.string(), z.string().max(256)).optional(),
    target: z.string().max(64).optional(),
    uid: z.string().optional(),
    name: z.string().optional(),
    projectId: z.string().optional(),
    environments: z
      .array(z.union([z.enum(["development", "preview", "production"]), z.string().regex(/^env_/)]))
      .optional(),
    triggers: z.boolean().optional(),
    triggerDestination: z
      .union([
        z.object({
          projectId: z.string().min(1).optional(),
          path: z.string().min(1).max(2048).optional(),
        }),
        z.object({
          projectId: z.string().min(1).optional(),
          branch: z.string().min(1).max(250),
          path: z.string().min(1).max(2048).optional(),
        }),
        z.object({
          projectId: z.string().min(1).optional(),
          customEnvironmentId: z.string().regex(/^env_/),
          path: z.string().min(1).max(2048).optional(),
        }),
      ])
      .optional(),
    events: z.array(z.string()).optional(),
  }),
]);
