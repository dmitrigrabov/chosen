import { type DomainName, domainName } from "packages/models/src/domainName.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1RegistrarDomainsAvailabilityArgs = {
  teamId?: string | undefined;
  body: { domains: Array<DomainName> };
};

export const useCreateApiV1RegistrarDomainsAvailabilityResponse = z.object({
  results: z.array(z.object({ domain: domainName, available: z.boolean() })),
});

export type UseCreateApiV1RegistrarDomainsAvailabilityResponse = {
  results: Array<{ domain: DomainName; available: boolean }>;
};

export type CreateApiV1RegistrarDomainsAvailabilityBody = { domains: Array<DomainName> };

export const useCreateApiV1RegistrarDomainsAvailability = (
  options: UseMutationOptions<
    UseCreateApiV1RegistrarDomainsAvailabilityResponse,
    Error,
    UseCreateApiV1RegistrarDomainsAvailabilityArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1RegistrarDomainsAvailabilityArgs) =>
      apiFetch(
        buildUrl("/v1/registrar/domains/availability", { teamId: args.teamId }),
        useCreateApiV1RegistrarDomainsAvailabilityResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["domains-registrar"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
