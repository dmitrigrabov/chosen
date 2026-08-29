import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsIdOrNameMembersUidArgs = {
  idOrName: string;
  uid: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ProjectsIdOrNameMembersUidResponse = z.object({ id: z.string() });

export type UseDeleteApiV1ProjectsIdOrNameMembersUidResponse = { id: string };

export type DeleteApiV1ProjectsIdOrNameMembersUidBody = void;

export const useDeleteApiV1ProjectsIdOrNameMembersUid = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsIdOrNameMembersUidResponse,
    Error,
    UseDeleteApiV1ProjectsIdOrNameMembersUidArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsIdOrNameMembersUidArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/members/{uid}", {
          idOrName: args.idOrName,
          uid: args.uid,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsIdOrNameMembersUidResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projectMembers"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
