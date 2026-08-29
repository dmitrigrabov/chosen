import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2DomainsDomainRecordsRecordIdArgs = {
  domain: string;
  recordId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2DomainsDomainRecordsRecordIdResponse = z.object({});

export type UseDeleteApiV2DomainsDomainRecordsRecordIdResponse = Record<string, never>;

export type DeleteApiV2DomainsDomainRecordsRecordIdBody = void;

export const useDeleteApiV2DomainsDomainRecordsRecordId = (
  options: UseMutationOptions<
    UseDeleteApiV2DomainsDomainRecordsRecordIdResponse,
    Error,
    UseDeleteApiV2DomainsDomainRecordsRecordIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2DomainsDomainRecordsRecordIdArgs) =>
      apiFetch(
        buildUrl("/v2/domains/{domain}/records/{recordId}", {
          domain: args.domain,
          recordId: args.recordId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2DomainsDomainRecordsRecordIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["dns"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
