import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs = {
  deploymentId: string;
  checkRunId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    externalId?: string | undefined;
    externalUrl?: string | undefined;
    status?: ("queued" | "running" | "completed") | undefined;
    output?: Record<string, never> | undefined;
    completedAt?: number | undefined;
    conclusion?:
      | ("canceled" | "skipped" | "timeout" | "failed" | "neutral" | "succeeded")
      | undefined;
    conclusionText?: string | undefined;
  };
};

export const usePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse = z.union([
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

export type UsePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse =
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

export type PatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdBody = {
  externalId?: string | undefined;
  externalUrl?: string | undefined;
  status?: ("queued" | "running" | "completed") | undefined;
  output?: Record<string, never> | undefined;
  completedAt?: number | undefined;
  conclusion?:
    | ("canceled" | "skipped" | "timeout" | "failed" | "neutral" | "succeeded")
    | undefined;
  conclusionText?: string | undefined;
};

export const usePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunId = (
  options: UseMutationOptions<
    UsePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse,
    Error,
    UsePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs) =>
      apiFetch(
        buildUrl("/v2/deployments/{deploymentId}/check-runs/{checkRunId}", {
          deploymentId: args.deploymentId,
          checkRunId: args.checkRunId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse,
        {
          method: "PATCH",
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
