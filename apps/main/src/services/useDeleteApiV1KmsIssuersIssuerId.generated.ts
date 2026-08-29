import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1KmsIssuersIssuerIdArgs = {
  issuerId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1KmsIssuersIssuerIdResponse = z.void();

export type UseDeleteApiV1KmsIssuersIssuerIdResponse = void;

export type DeleteApiV1KmsIssuersIssuerIdBody = void;

export const useDeleteApiV1KmsIssuersIssuerId = (
  options: UseMutationOptions<
    UseDeleteApiV1KmsIssuersIssuerIdResponse,
    Error,
    UseDeleteApiV1KmsIssuersIssuerIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1KmsIssuersIssuerIdArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}", {
          issuerId: args.issuerId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1KmsIssuersIssuerIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
