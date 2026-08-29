import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2ProjectsProjectIdOrNameChecksArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name: string;
    isRerequestable?: boolean | undefined;
    requires: "build-ready" | "deployment-url" | "none";
    targets?: Array<string> | undefined;
    blocks?:
      | ("build-start" | "deployment-start" | "deployment-alias" | "deployment-promotion" | "none")
      | undefined;
    source?:
      | (
          | { kind?: string | undefined; externalResourceId?: string | undefined }
          | { kind: string; webhookId?: string | undefined }
          | { kind: string; externalCheckName: string; provider: "github" }
        )
      | undefined;
    timeout?: number | undefined;
  };
};

export const useCreateApiV2ProjectsProjectIdOrNameChecksResponse = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  projectId: z.string(),
  isRerequestable: z.boolean(),
  requires: z.enum(["build-ready", "deployment-url", "none"]),
  source: z.union([
    z.object({
      kind: z.literal("integration"),
      integrationId: z.string(),
      integrationConfigurationId: z.string(),
      resourceId: z.string().optional(),
      externalResourceId: z.string().optional(),
    }),
    z.object({ kind: z.literal("webhook"), webhookId: z.string().optional() }),
    z.object({
      kind: z.literal("git-provider"),
      provider: z.enum(["bitbucket", "github", "gitlab"]),
      externalCheckName: z.string(),
    }),
  ]),
  blocks: z.enum([
    "build-start",
    "deployment-alias",
    "deployment-promotion",
    "deployment-start",
    "none",
  ]),
  targets: z.array(z.string()),
  sourceKind: z.enum([
    "git-provider",
    "integration",
    "vercel",
    "webhook",
    "integration",
    "webhook",
    "git-provider",
  ]),
  sourceIntegrationConfigurationId: z.string().optional(),
  timeout: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().optional(),
});

export type UseCreateApiV2ProjectsProjectIdOrNameChecksResponse = {
  id: string;
  name: string;
  ownerId: string;
  projectId: string;
  isRerequestable: boolean;
  requires: "build-ready" | "deployment-url" | "none";
  source:
    | {
        kind: "integration";
        integrationId: string;
        integrationConfigurationId: string;
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
      }
    | { kind: "webhook"; webhookId?: string | undefined }
    | {
        kind: "git-provider";
        provider: "bitbucket" | "github" | "gitlab";
        externalCheckName: string;
      };
  blocks: "build-start" | "deployment-alias" | "deployment-promotion" | "deployment-start" | "none";
  targets: Array<string>;
  sourceKind:
    | "git-provider"
    | "integration"
    | "vercel"
    | "webhook"
    | "integration"
    | "webhook"
    | "git-provider";
  sourceIntegrationConfigurationId?: string | undefined;
  timeout: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | undefined;
};

export type CreateApiV2ProjectsProjectIdOrNameChecksBody = {
  name: string;
  isRerequestable?: boolean | undefined;
  requires: "build-ready" | "deployment-url" | "none";
  targets?: Array<string> | undefined;
  blocks?:
    | ("build-start" | "deployment-start" | "deployment-alias" | "deployment-promotion" | "none")
    | undefined;
  source?:
    | (
        | { kind?: string | undefined; externalResourceId?: string | undefined }
        | { kind: string; webhookId?: string | undefined }
        | { kind: string; externalCheckName: string; provider: "github" }
      )
    | undefined;
  timeout?: number | undefined;
};

export const useCreateApiV2ProjectsProjectIdOrNameChecks = (
  options: UseMutationOptions<
    UseCreateApiV2ProjectsProjectIdOrNameChecksResponse,
    Error,
    UseCreateApiV2ProjectsProjectIdOrNameChecksArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2ProjectsProjectIdOrNameChecksArgs) =>
      apiFetch(
        buildUrl("/v2/projects/{projectIdOrName}/checks", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2ProjectsProjectIdOrNameChecksResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["checks-v2"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
