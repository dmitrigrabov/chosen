import {
  flagsSdkKeyWithSecrets,
  type FlagsSdkKeyWithSecrets,
} from "packages/models/src/flagsSdkKeyWithSecrets.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    sdkKeyType: "server" | "mobile" | "client";
    environment: string;
    label?: string | undefined;
  };
};

export type UpdateApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysBody = {
  sdkKeyType: "server" | "mobile" | "client";
  environment: string;
  label?: string | undefined;
};

export const useUpdateApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeys = (
  options: UseMutationOptions<
    FlagsSdkKeyWithSecrets,
    Error,
    UseUpdateApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1ProjectsProjectIdOrNameFeatureFlagsSdkKeysArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/sdk-keys", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        flagsSdkKeyWithSecrets,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["feature-flags"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
