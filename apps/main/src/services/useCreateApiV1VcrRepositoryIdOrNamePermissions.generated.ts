import {
  vcrRepositoryPermission,
  type VcrRepositoryPermission,
} from "packages/models/src/vcrRepositoryPermission.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1VcrRepositoryIdOrNamePermissionsArgs = {
  projectId: string;
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { teamId?: string | undefined; teamSlug?: string | undefined };
};

export const useCreateApiV1VcrRepositoryIdOrNamePermissionsResponse = z.object({
  permission: vcrRepositoryPermission,
});

export type UseCreateApiV1VcrRepositoryIdOrNamePermissionsResponse = {
  permission: VcrRepositoryPermission;
};

export type CreateApiV1VcrRepositoryIdOrNamePermissionsBody = {
  teamId?: string | undefined;
  teamSlug?: string | undefined;
};

export const useCreateApiV1VcrRepositoryIdOrNamePermissions = (
  options: UseMutationOptions<
    UseCreateApiV1VcrRepositoryIdOrNamePermissionsResponse,
    Error,
    UseCreateApiV1VcrRepositoryIdOrNamePermissionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1VcrRepositoryIdOrNamePermissionsArgs) =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/permissions", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1VcrRepositoryIdOrNamePermissionsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["vcr"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
