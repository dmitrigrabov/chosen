import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiProjectsIdOrNameTransferRequestArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { callbackUrl?: string | undefined; callbackSecret?: string | undefined };
};

export const useCreateApiProjectsIdOrNameTransferRequestResponse = z.object({ code: z.string() });

export type UseCreateApiProjectsIdOrNameTransferRequestResponse = { code: string };

export type CreateApiProjectsIdOrNameTransferRequestBody = {
  callbackUrl?: string | undefined;
  callbackSecret?: string | undefined;
};

export const useCreateApiProjectsIdOrNameTransferRequest = (
  options: UseMutationOptions<
    UseCreateApiProjectsIdOrNameTransferRequestResponse,
    Error,
    UseCreateApiProjectsIdOrNameTransferRequestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiProjectsIdOrNameTransferRequestArgs) =>
      apiFetch(
        buildUrl("/projects/{idOrName}/transfer-request", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiProjectsIdOrNameTransferRequestResponse,
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
