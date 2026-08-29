import { network, type Network } from "packages/models/src/network.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ConnectNetworksNetworkIdArgs = {
  networkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { name: string };
};

export type PatchApiV1ConnectNetworksNetworkIdBody = { name: string };

export const usePatchApiV1ConnectNetworksNetworkId = (
  options: UseMutationOptions<
    Network,
    Error,
    UsePatchApiV1ConnectNetworksNetworkIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ConnectNetworksNetworkIdArgs) =>
      apiFetch(
        buildUrl("/v1/connect/networks/{networkId}", {
          networkId: args.networkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        network,
        {
          method: "PATCH",
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
