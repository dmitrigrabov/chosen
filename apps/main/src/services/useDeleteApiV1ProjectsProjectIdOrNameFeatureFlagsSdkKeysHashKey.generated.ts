import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyArgs = {
  projectIdOrName: string;
  hashKey: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyResponse = z.void();

export type UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyResponse = void;

export type DeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyBody = void;

export const useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKey = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyResponse,
    Error,
    UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/sdk-keys/{hashKey}", {
          projectIdOrName: args.projectIdOrName,
          hashKey: args.hashKey,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysHashKeyResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["feature-flags"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
