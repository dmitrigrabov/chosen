import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsIdOrNameTokenArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { source?: string | undefined };
};

export const useCreateApiV1ProjectsIdOrNameTokenResponse = z.object({ token: z.string() });

export type UseCreateApiV1ProjectsIdOrNameTokenResponse = { token: string };

export type CreateApiV1ProjectsIdOrNameTokenBody = { source?: string | undefined };

export const useCreateApiV1ProjectsIdOrNameToken = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsIdOrNameTokenResponse,
    Error,
    UseCreateApiV1ProjectsIdOrNameTokenArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsIdOrNameTokenArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/token", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsIdOrNameTokenResponse,
        {
          method: "POST",
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
