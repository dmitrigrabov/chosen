import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1EnvArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        evs: Array<{ key: string; value: string; comment?: string | undefined }>;
        type?: ("encrypted" | "sensitive") | undefined;
        target: Array<"production" | "preview" | "development">;
        projectId?: Array<string> | undefined;
      }
    | {
        evs: Array<{ key: string; value: string; comment?: string | undefined }>;
        type?: ("encrypted" | "sensitive") | undefined;
        target?: Array<"production" | "preview" | "development"> | undefined;
        projectId?: Array<string> | undefined;
      }
    | {
        evs: Array<{ key: string; value: string; comment?: string | undefined }>;
        type?: ("encrypted" | "sensitive") | undefined;
        target?: Array<"production" | "preview" | "development"> | undefined;
        projectId?: Array<string> | undefined;
      };
};

export const useCreateApiV1EnvResponse = z.object({
  created: z.array(
    z.object({
      created: z.string().optional(),
      key: z.string().optional(),
      ownerId: z.string().nullable().optional(),
      id: z.string().optional(),
      createdBy: z.string().nullable().optional(),
      deletedBy: z.string().nullable().optional(),
      updatedBy: z.string().nullable().optional(),
      createdAt: z.number().optional(),
      deletedAt: z.number().optional(),
      updatedAt: z.number().optional(),
      value: z.string().optional(),
      projectId: z.array(z.string()).optional(),
      type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(),
      target: z.array(z.enum(["development", "preview", "production"])).optional(),
      applyToAllCustomEnvironments: z.boolean().optional(),
      customEnvironmentIds: z.array(z.string()).optional(),
      decrypted: z.boolean().optional(),
      comment: z.string().optional(),
      lastEditedByDisplayName: z.string().optional(),
    }),
  ),
  failed: z.array(
    z.object({
      error: z.object({
        code: z.string(),
        message: z.string(),
        key: z.string().optional(),
        envVarId: z.string().optional(),
        envVarKey: z.string().optional(),
        action: z.string().optional(),
        link: z.string().optional(),
        value: z
          .union([
            z.string(),
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
          ])
          .optional(),
        gitBranch: z.string().optional(),
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["development", "development", "preview", "preview", "production"]),
          ])
          .optional(),
        project: z.string().optional(),
      }),
    }),
  ),
});

export type UseCreateApiV1EnvResponse = {
  created: Array<{
    created?: string | undefined;
    key?: string | undefined;
    ownerId?: (string | null) | undefined;
    id?: string | undefined;
    createdBy?: (string | null) | undefined;
    deletedBy?: (string | null) | undefined;
    updatedBy?: (string | null) | undefined;
    createdAt?: number | undefined;
    deletedAt?: number | undefined;
    updatedAt?: number | undefined;
    value?: string | undefined;
    projectId?: Array<string> | undefined;
    type?: ("encrypted" | "plain" | "sensitive" | "system") | undefined;
    target?: Array<"development" | "preview" | "production"> | undefined;
    applyToAllCustomEnvironments?: boolean | undefined;
    customEnvironmentIds?: Array<string> | undefined;
    decrypted?: boolean | undefined;
    comment?: string | undefined;
    lastEditedByDisplayName?: string | undefined;
  }>;
  failed: Array<{
    error: {
      code: string;
      message: string;
      key?: string | undefined;
      envVarId?: string | undefined;
      envVarKey?: string | undefined;
      action?: string | undefined;
      link?: string | undefined;
      value?:
        | (string | Array<"development" | "development" | "preview" | "preview" | "production">)
        | undefined;
      gitBranch?: string | undefined;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "development"
            | "development"
            | "preview"
            | "preview"
            | "production"
          )
        | undefined;
      project?: string | undefined;
    };
  }>;
};

export type CreateApiV1EnvBody =
  | {
      evs: Array<{ key: string; value: string; comment?: string | undefined }>;
      type?: ("encrypted" | "sensitive") | undefined;
      target: Array<"production" | "preview" | "development">;
      projectId?: Array<string> | undefined;
    }
  | {
      evs: Array<{ key: string; value: string; comment?: string | undefined }>;
      type?: ("encrypted" | "sensitive") | undefined;
      target?: Array<"production" | "preview" | "development"> | undefined;
      projectId?: Array<string> | undefined;
    }
  | {
      evs: Array<{ key: string; value: string; comment?: string | undefined }>;
      type?: ("encrypted" | "sensitive") | undefined;
      target?: Array<"production" | "preview" | "development"> | undefined;
      projectId?: Array<string> | undefined;
    };

export const useCreateApiV1Env = (
  options: UseMutationOptions<
    UseCreateApiV1EnvResponse,
    Error,
    UseCreateApiV1EnvArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1EnvArgs) =>
      apiFetch(
        buildUrl("/v1/env", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1EnvResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["environment"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
