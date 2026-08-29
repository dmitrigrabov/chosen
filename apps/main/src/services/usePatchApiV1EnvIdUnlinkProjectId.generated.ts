import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1EnvIdUnlinkProjectIdArgs = {
  id: string;
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const usePatchApiV1EnvIdUnlinkProjectIdResponse = z.object({ id: z.string() });

export type UsePatchApiV1EnvIdUnlinkProjectIdResponse = { id: string };

export type PatchApiV1EnvIdUnlinkProjectIdBody = void;

export const usePatchApiV1EnvIdUnlinkProjectId = (
  options: UseMutationOptions<
    UsePatchApiV1EnvIdUnlinkProjectIdResponse,
    Error,
    UsePatchApiV1EnvIdUnlinkProjectIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1EnvIdUnlinkProjectIdArgs) =>
      apiFetch(
        buildUrl("/v1/env/{id}/unlink/{projectId}", {
          id: args.id,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1EnvIdUnlinkProjectIdResponse,
        { method: "PATCH" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["environment"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
