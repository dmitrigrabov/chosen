import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsTracesSessionArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { projectId: string; hostname: string };
};

export const useCreateApiV1ProjectsTracesSessionResponse = z.object({ token: z.string() });

export type UseCreateApiV1ProjectsTracesSessionResponse = { token: string };

export type CreateApiV1ProjectsTracesSessionBody = { projectId: string; hostname: string };

export const useCreateApiV1ProjectsTracesSession = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsTracesSessionResponse,
    Error,
    UseCreateApiV1ProjectsTracesSessionArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsTracesSessionArgs) =>
      apiFetch(
        buildUrl("/v1/projects/traces/session", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1ProjectsTracesSessionResponse,
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
