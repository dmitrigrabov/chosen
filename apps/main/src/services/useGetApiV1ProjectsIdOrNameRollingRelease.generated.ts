import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsIdOrNameRollingReleaseArgs = {
  idOrName: string;
  state?: ("ACTIVE" | "COMPLETE" | "ABORTED") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsIdOrNameRollingReleaseResponse = z.object({
  rollingRelease: z
    .object({
      state: z.enum(["ABORTED", "ACTIVE", "COMPLETE"]),
      substate: z.enum(["PAUSED", "null"]).nullable(),
      currentDeployment: z
        .object({
          name: z.string(),
          createdAt: z.number(),
          readyState: z.enum([
            "BLOCKED",
            "BUILDING",
            "CANCELED",
            "ERROR",
            "INITIALIZING",
            "QUEUED",
            "READY",
          ]),
          id: z.string(),
          target: z.enum(["production", "staging", "null"]).nullable().optional(),
          readyStateAt: z.number().optional(),
          source: z
            .enum([
              "api-trigger-git-deploy",
              "cli",
              "clone/repo",
              "drop",
              "git",
              "git-deploy-hook",
              "import",
              "import/repo",
              "redeploy",
              "v0-web",
            ])
            .optional(),
          url: z.string(),
        })
        .nullable(),
      canaryDeployment: z
        .object({
          name: z.string(),
          createdAt: z.number(),
          readyState: z.enum([
            "BLOCKED",
            "BUILDING",
            "CANCELED",
            "ERROR",
            "INITIALIZING",
            "QUEUED",
            "READY",
          ]),
          id: z.string(),
          target: z.enum(["production", "staging", "null"]).nullable().optional(),
          readyStateAt: z.number().optional(),
          source: z
            .enum([
              "api-trigger-git-deploy",
              "cli",
              "clone/repo",
              "drop",
              "git",
              "git-deploy-hook",
              "import",
              "import/repo",
              "redeploy",
              "v0-web",
            ])
            .optional(),
          url: z.string(),
        })
        .nullable(),
      queuedDeploymentId: z.string().nullable(),
      advancementType: z.enum(["automatic", "manual-approval"]),
      stages: z.array(
        z.object({
          index: z.number(),
          isFinalStage: z.boolean(),
          targetPercentage: z.number(),
          requireApproval: z.boolean(),
          duration: z.number().nullable(),
          linearShift: z.boolean().optional(),
        }),
      ),
      activeStage: z
        .object({
          index: z.number(),
          isFinalStage: z.boolean(),
          targetPercentage: z.number(),
          requireApproval: z.boolean(),
          duration: z.number().nullable(),
          linearShift: z.boolean().optional(),
        })
        .nullable(),
      nextStage: z
        .object({
          index: z.number(),
          isFinalStage: z.boolean(),
          targetPercentage: z.number(),
          requireApproval: z.boolean(),
          duration: z.number().nullable(),
          linearShift: z.boolean().optional(),
        })
        .nullable(),
      startedAt: z.number(),
      updatedAt: z.number(),
      currentCanaryPercentage: z.number().optional(),
    })
    .nullable(),
});

export const getApiV1ProjectsIdOrNameRollingReleaseQueryOptions = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{idOrName}/rolling-release",
      "rolling-release",
      args.idOrName,
      args.state,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release", {
          idOrName: args.idOrName,
          state: args.state,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsIdOrNameRollingReleaseResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsIdOrNameRollingRelease = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseArgs,
) => useQuery(getApiV1ProjectsIdOrNameRollingReleaseQueryOptions(args));
