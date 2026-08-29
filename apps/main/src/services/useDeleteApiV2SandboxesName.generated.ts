import { namedSandbox, type NamedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2SandboxesNameArgs = {
  name: string;
  projectId?: string | undefined;
  deleteOrphanSnapshots?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2SandboxesNameResponse = z.object({ sandbox: namedSandbox });

export type UseDeleteApiV2SandboxesNameResponse = { sandbox: NamedSandbox };

export type DeleteApiV2SandboxesNameBody = void;

export const useDeleteApiV2SandboxesName = (
  options: UseMutationOptions<
    UseDeleteApiV2SandboxesNameResponse,
    Error,
    UseDeleteApiV2SandboxesNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2SandboxesNameArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/{name}", {
          name: args.name,
          projectId: args.projectId,
          deleteOrphanSnapshots: args.deleteOrphanSnapshots,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2SandboxesNameResponse,
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
