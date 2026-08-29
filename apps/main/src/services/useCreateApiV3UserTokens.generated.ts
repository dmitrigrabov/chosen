import { authToken, type AuthToken } from "packages/models/src/authToken.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV3UserTokensArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { name: string; expiresAt?: number | undefined; projectId?: string | undefined };
};

export const useCreateApiV3UserTokensResponse = z.object({
  token: authToken,
  bearerToken: z.string(),
});

export type UseCreateApiV3UserTokensResponse = { token: AuthToken; bearerToken: string };

export type CreateApiV3UserTokensBody = {
  name: string;
  expiresAt?: number | undefined;
  projectId?: string | undefined;
};

export const useCreateApiV3UserTokens = (
  options: UseMutationOptions<
    UseCreateApiV3UserTokensResponse,
    Error,
    UseCreateApiV3UserTokensArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV3UserTokensArgs) =>
      apiFetch(
        buildUrl("/v3/user/tokens", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV3UserTokensResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["authentication"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
