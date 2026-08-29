import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiDomainsDomainRecordsArgs = { domain: string };

export const useUpdateApiDomainsDomainRecordsResponse = z.object({
  recordIds: z.array(z.string()),
});

export type UseUpdateApiDomainsDomainRecordsResponse = { recordIds: Array<string> };

export type UpdateApiDomainsDomainRecordsBody = void;

export const useUpdateApiDomainsDomainRecords = (
  options: UseMutationOptions<
    UseUpdateApiDomainsDomainRecordsResponse,
    Error,
    UseUpdateApiDomainsDomainRecordsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiDomainsDomainRecordsArgs) =>
      apiFetch(
        buildUrl("/domains/{domain}/records", { domain: args.domain }),
        useUpdateApiDomainsDomainRecordsResponse,
        { method: "PUT" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: [] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
