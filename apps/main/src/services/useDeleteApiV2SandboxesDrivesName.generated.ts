import { drive, type Drive } from "packages/models/src/drive.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2SandboxesDrivesNameArgs = {
  name: string;
  projectId?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2SandboxesDrivesNameResponse = z.object({ drive: drive });

export type UseDeleteApiV2SandboxesDrivesNameResponse = { drive: Drive };

export type DeleteApiV2SandboxesDrivesNameBody = void;

export const useDeleteApiV2SandboxesDrivesName = (
  options: UseMutationOptions<
    UseDeleteApiV2SandboxesDrivesNameResponse,
    Error,
    UseDeleteApiV2SandboxesDrivesNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2SandboxesDrivesNameArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/drives/{name}", {
          name: args.name,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2SandboxesDrivesNameResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
