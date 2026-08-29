import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1KmsIssuersIssuerIdSignTokenArgs = {
  issuerId: string;
  body: {
    claims?: Record<string, never> | undefined;
    headers?: Record<string, never> | undefined;
    ttl?: (number | null) | undefined;
  };
};

export const useCreateApiV1KmsIssuersIssuerIdSignTokenResponse = z.object({ token: z.string() });

export type UseCreateApiV1KmsIssuersIssuerIdSignTokenResponse = { token: string };

export type CreateApiV1KmsIssuersIssuerIdSignTokenBody = {
  claims?: Record<string, never> | undefined;
  headers?: Record<string, never> | undefined;
  ttl?: (number | null) | undefined;
};

export const useCreateApiV1KmsIssuersIssuerIdSignToken = (
  options: UseMutationOptions<
    UseCreateApiV1KmsIssuersIssuerIdSignTokenResponse,
    Error,
    UseCreateApiV1KmsIssuersIssuerIdSignTokenArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1KmsIssuersIssuerIdSignTokenArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/sign/token", { issuerId: args.issuerId }),
        useCreateApiV1KmsIssuersIssuerIdSignTokenResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
