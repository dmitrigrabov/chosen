import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsIdOrNameRollingReleaseStartArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { canaryDeploymentId: string };
};

export const useCreateApiV1ProjectsIdOrNameRollingReleaseStartResponse = z.object({
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

export type UseCreateApiV1ProjectsIdOrNameRollingReleaseStartResponse = {
  rollingRelease: {
    state: "ABORTED" | "ACTIVE" | "COMPLETE";
    substate: "PAUSED" | "null" | null;
    currentDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    canaryDeployment: {
      name: string;
      createdAt: number;
      readyState:
        | "BLOCKED"
        | "BUILDING"
        | "CANCELED"
        | "ERROR"
        | "INITIALIZING"
        | "QUEUED"
        | "READY";
      id: string;
      target?: ("production" | "staging" | "null" | null) | undefined;
      readyStateAt?: number | undefined;
      source?:
        | (
            | "api-trigger-git-deploy"
            | "cli"
            | "clone/repo"
            | "drop"
            | "git"
            | "git-deploy-hook"
            | "import"
            | "import/repo"
            | "redeploy"
            | "v0-web"
          )
        | undefined;
      url: string;
    } | null;
    queuedDeploymentId: string | null;
    advancementType: "automatic" | "manual-approval";
    stages: Array<{
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    }>;
    activeStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    nextStage: {
      index: number;
      isFinalStage: boolean;
      targetPercentage: number;
      requireApproval: boolean;
      duration: number | null;
      linearShift?: boolean | undefined;
    } | null;
    startedAt: number;
    updatedAt: number;
    currentCanaryPercentage?: number | undefined;
  } | null;
};

export type CreateApiV1ProjectsIdOrNameRollingReleaseStartBody = { canaryDeploymentId: string };

export const useCreateApiV1ProjectsIdOrNameRollingReleaseStart = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsIdOrNameRollingReleaseStartResponse,
    Error,
    UseCreateApiV1ProjectsIdOrNameRollingReleaseStartArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsIdOrNameRollingReleaseStartArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/start", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsIdOrNameRollingReleaseStartResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["rolling-release"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
