import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsIdOrNameRollingReleaseConfigArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ProjectsIdOrNameRollingReleaseConfigResponse = z.object({
  rollingRelease: z.unknown(),
});

export type UseDeleteApiV1ProjectsIdOrNameRollingReleaseConfigResponse = {
  rollingRelease: unknown;
};

export type DeleteApiV1ProjectsIdOrNameRollingReleaseConfigBody = void;

export const useDeleteApiV1ProjectsIdOrNameRollingReleaseConfig = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsIdOrNameRollingReleaseConfigResponse,
    Error,
    UseDeleteApiV1ProjectsIdOrNameRollingReleaseConfigArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsIdOrNameRollingReleaseConfigArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/config", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsIdOrNameRollingReleaseConfigResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["rolling-release"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
