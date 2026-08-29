import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { disabled: boolean };
};

export const useUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse =
  z.object({ id: z.string(), disabledAt: z.number().optional() });

export type UseUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse = {
  id: string;
  disabledAt?: number | undefined;
};

export type UpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameBody = {
  disabled: boolean;
};

export const useUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrName = (
  options: UseMutationOptions<
    UseUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse,
    Error,
    UseUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameArgs) =>
      apiFetch(
        buildUrl("/v1/observability/manage/configuration/projects/{projectIdOrName}", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useUpdateApiV1ObservabilityManageConfigurationProjectsProjectIdOrNameResponse,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["observability"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
