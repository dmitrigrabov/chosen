import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV8CertsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { cns?: Array<string> | undefined };
};

export const useCreateApiV8CertsResponse = z.object({
  id: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  autoRenew: z.boolean(),
  cns: z.array(z.string()),
});

export type UseCreateApiV8CertsResponse = {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: Array<string>;
};

export type CreateApiV8CertsBody = { cns?: Array<string> | undefined };

export const useCreateApiV8Certs = (
  options: UseMutationOptions<
    UseCreateApiV8CertsResponse,
    Error,
    UseCreateApiV8CertsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV8CertsArgs) =>
      apiFetch(
        buildUrl("/v8/certs", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV8CertsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["certs"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
