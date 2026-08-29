import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdArgs = {
  projectIdOrName: string;
  checkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdResponse = z.object({
  success: z.literal(true),
});

export type UseDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdResponse = { success: true };

export type DeleteApiV2ProjectsProjectIdOrNameChecksCheckIdBody = void;

export const useDeleteApiV2ProjectsProjectIdOrNameChecksCheckId = (
  options: UseMutationOptions<
    UseDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdResponse,
    Error,
    UseDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdArgs) =>
      apiFetch(
        buildUrl("/v2/projects/{projectIdOrName}/checks/{checkId}", {
          projectIdOrName: args.projectIdOrName,
          checkId: args.checkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2ProjectsProjectIdOrNameChecksCheckIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["checks-v2"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
