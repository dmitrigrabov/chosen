import { network, type Network } from "packages/models/src/network.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ConnectNetworksArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    awsAvailabilityZoneIds?: Array<string> | undefined;
    cidr: string;
    name: string;
    region: string;
  };
};

export type CreateApiV1ConnectNetworksBody = {
  awsAvailabilityZoneIds?: Array<string> | undefined;
  cidr: string;
  name: string;
  region: string;
};

export const useCreateApiV1ConnectNetworks = (
  options: UseMutationOptions<Network, Error, UseCreateApiV1ConnectNetworksArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ConnectNetworksArgs) =>
      apiFetch(
        buildUrl("/v1/connect/networks", { teamId: args.teamId, slug: args.slug }),
        network,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["networking"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
