import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV8CertsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { ca: string; key: string; cert: string; skipValidation?: boolean | undefined };
};

export const useUpdateApiV8CertsResponse = z.object({
  id: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  autoRenew: z.boolean(),
  cns: z.array(z.string()),
});

export type UseUpdateApiV8CertsResponse = {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: Array<string>;
};

export type UpdateApiV8CertsBody = {
  ca: string;
  key: string;
  cert: string;
  skipValidation?: boolean | undefined;
};

export const useUpdateApiV8Certs = (
  options: UseMutationOptions<
    UseUpdateApiV8CertsResponse,
    Error,
    UseUpdateApiV8CertsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV8CertsArgs) =>
      apiFetch(
        buildUrl("/v8/certs", { teamId: args.teamId, slug: args.slug }),
        useUpdateApiV8CertsResponse,
        {
          method: "PUT",
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
