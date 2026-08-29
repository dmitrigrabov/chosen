import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsIdOrNameRollingReleaseConfigArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const usePatchApiV1ProjectsIdOrNameRollingReleaseConfigResponse = z.union([
  z.object({ rollingRelease: z.unknown() }),
  z.object({
    rollingRelease: z
      .object({
        stages: z
          .array(
            z.object({
              targetPercentage: z.number(),
              requireApproval: z.boolean().optional(),
              duration: z.number().optional(),
              linearShift: z.boolean().optional(),
            }),
          )
          .nullable()
          .optional(),
      })
      .nullable(),
  }),
]);

export type UsePatchApiV1ProjectsIdOrNameRollingReleaseConfigResponse =
  | { rollingRelease: unknown }
  | {
      rollingRelease: {
        stages?:
          | (Array<{
              targetPercentage: number;
              requireApproval?: boolean | undefined;
              duration?: number | undefined;
              linearShift?: boolean | undefined;
            }> | null)
          | undefined;
      } | null;
    };

export type PatchApiV1ProjectsIdOrNameRollingReleaseConfigBody = void;

export const usePatchApiV1ProjectsIdOrNameRollingReleaseConfig = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsIdOrNameRollingReleaseConfigResponse,
    Error,
    UsePatchApiV1ProjectsIdOrNameRollingReleaseConfigArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsIdOrNameRollingReleaseConfigArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/config", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsIdOrNameRollingReleaseConfigResponse,
        { method: "PATCH" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["rolling-release"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
