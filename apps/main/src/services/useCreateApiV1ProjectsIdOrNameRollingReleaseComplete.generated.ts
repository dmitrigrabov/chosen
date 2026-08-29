import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsIdOrNameRollingReleaseCompleteArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { canaryDeploymentId: string };
};

export const useCreateApiV1ProjectsIdOrNameRollingReleaseCompleteResponse = z.object({
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

export type UseCreateApiV1ProjectsIdOrNameRollingReleaseCompleteResponse = {
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

export type CreateApiV1ProjectsIdOrNameRollingReleaseCompleteBody = { canaryDeploymentId: string };

export const useCreateApiV1ProjectsIdOrNameRollingReleaseComplete = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsIdOrNameRollingReleaseCompleteResponse,
    Error,
    UseCreateApiV1ProjectsIdOrNameRollingReleaseCompleteArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsIdOrNameRollingReleaseCompleteArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/complete", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsIdOrNameRollingReleaseCompleteResponse,
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
