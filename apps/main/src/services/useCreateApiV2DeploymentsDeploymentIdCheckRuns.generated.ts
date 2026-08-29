import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2DeploymentsDeploymentIdCheckRunsArgs = {
  deploymentId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { checkId: string };
};

export const useCreateApiV2DeploymentsDeploymentIdCheckRunsResponse = z.union([
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    deploymentId: z.string(),
    projectId: z.string().optional(),
    requires: z.enum(["build-ready", "deployment-url", "none"]).optional(),
    blocks: z
      .enum(["build-start", "deployment-alias", "deployment-promotion", "deployment-start", "none"])
      .optional(),
    targets: z.array(z.string()).optional(),
    status: z.enum(["completed", "queued", "running"]),
    conclusion: z
      .enum(["canceled", "failed", "neutral", "skipped", "succeeded", "timeout"])
      .optional(),
    conclusionText: z.string().optional(),
    externalId: z.string().optional(),
    externalUrl: z.string().optional(),
    output: z.record(z.string(), z.unknown()).optional(),
    timeout: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    completedAt: z.number().optional(),
    checkId: z.string(),
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
      z.object({
        subKind: z.literal("vercel-native-check").optional(),
        origin: z.enum(["api", "platform"]).optional(),
      }),
    ]),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    deploymentId: z.string(),
    projectId: z.string().optional(),
    requires: z.enum(["build-ready", "deployment-url", "none"]).optional(),
    blocks: z
      .enum(["build-start", "deployment-alias", "deployment-promotion", "deployment-start", "none"])
      .optional(),
    targets: z.array(z.string()).optional(),
    status: z.enum(["completed", "queued", "running"]),
    conclusion: z
      .enum(["canceled", "failed", "neutral", "skipped", "succeeded", "timeout"])
      .optional(),
    conclusionText: z.string().optional(),
    externalId: z.string().optional(),
    externalUrl: z.string().optional(),
    output: z.record(z.string(), z.unknown()).optional(),
    timeout: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    completedAt: z.number().optional(),
    source: z.union([
      z.object({
        subKind: z.literal("vercel-ci"),
        origin: z.literal("config"),
        invocationId: z.string(),
        jobDefinitionId: z.string(),
      }),
      z.object({ subKind: z.literal("vercel-ci-sentinel"), origin: z.literal("platform") }),
    ]),
  }),
]);

export type UseCreateApiV2DeploymentsDeploymentIdCheckRunsResponse =
  | {
      id: string;
      name: string;
      ownerId: string;
      deploymentId: string;
      projectId?: string | undefined;
      requires?: ("build-ready" | "deployment-url" | "none") | undefined;
      blocks?:
        | (
            | "build-start"
            | "deployment-alias"
            | "deployment-promotion"
            | "deployment-start"
            | "none"
          )
        | undefined;
      targets?: Array<string> | undefined;
      status: "completed" | "queued" | "running";
      conclusion?:
        | ("canceled" | "failed" | "neutral" | "skipped" | "succeeded" | "timeout")
        | undefined;
      conclusionText?: string | undefined;
      externalId?: string | undefined;
      externalUrl?: string | undefined;
      output?: Record<string, unknown> | undefined;
      timeout: number;
      createdAt: number;
      updatedAt: number;
      completedAt?: number | undefined;
      checkId: string;
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
          }
        | {
            subKind?: "vercel-native-check" | undefined;
            origin?: ("api" | "platform") | undefined;
          };
    }
  | {
      id: string;
      name: string;
      ownerId: string;
      deploymentId: string;
      projectId?: string | undefined;
      requires?: ("build-ready" | "deployment-url" | "none") | undefined;
      blocks?:
        | (
            | "build-start"
            | "deployment-alias"
            | "deployment-promotion"
            | "deployment-start"
            | "none"
          )
        | undefined;
      targets?: Array<string> | undefined;
      status: "completed" | "queued" | "running";
      conclusion?:
        | ("canceled" | "failed" | "neutral" | "skipped" | "succeeded" | "timeout")
        | undefined;
      conclusionText?: string | undefined;
      externalId?: string | undefined;
      externalUrl?: string | undefined;
      output?: Record<string, unknown> | undefined;
      timeout: number;
      createdAt: number;
      updatedAt: number;
      completedAt?: number | undefined;
      source:
        | { subKind: "vercel-ci"; origin: "config"; invocationId: string; jobDefinitionId: string }
        | { subKind: "vercel-ci-sentinel"; origin: "platform" };
    };

export type CreateApiV2DeploymentsDeploymentIdCheckRunsBody = { checkId: string };

export const useCreateApiV2DeploymentsDeploymentIdCheckRuns = (
  options: UseMutationOptions<
    UseCreateApiV2DeploymentsDeploymentIdCheckRunsResponse,
    Error,
    UseCreateApiV2DeploymentsDeploymentIdCheckRunsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2DeploymentsDeploymentIdCheckRunsArgs) =>
      apiFetch(
        buildUrl("/v2/deployments/{deploymentId}/check-runs", {
          deploymentId: args.deploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2DeploymentsDeploymentIdCheckRunsResponse,
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
