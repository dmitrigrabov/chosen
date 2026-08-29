import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ProjectsIdOrNameEnvArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { ids: Array<string> };
};

export const useDeleteApiV1ProjectsIdOrNameEnvResponse = z.object({
  deleted: z.number(),
  ids: z.array(z.string()),
});

export type UseDeleteApiV1ProjectsIdOrNameEnvResponse = { deleted: number; ids: Array<string> };

export type DeleteApiV1ProjectsIdOrNameEnvBody = { ids: Array<string> };

export const useDeleteApiV1ProjectsIdOrNameEnv = (
  options: UseMutationOptions<
    UseDeleteApiV1ProjectsIdOrNameEnvResponse,
    Error,
    UseDeleteApiV1ProjectsIdOrNameEnvArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ProjectsIdOrNameEnvArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/env", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ProjectsIdOrNameEnvResponse,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
