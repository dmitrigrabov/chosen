import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs = {
  deploymentId: string;
  checkRunId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse = z.union([
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

export const getApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdQueryOptions = (
  args: UseGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/deployments/{deploymentId}/check-runs/{checkRunId}",
      "checks-v2",
      args.deploymentId,
      args.checkRunId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/deployments/{deploymentId}/check-runs/{checkRunId}", {
          deploymentId: args.deploymentId,
          checkRunId: args.checkRunId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunId = (
  args: UseGetApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdArgs,
) => useQuery(getApiV2DeploymentsDeploymentIdCheckRunsCheckRunIdQueryOptions(args));
