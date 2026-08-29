import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1ConnectNetworksNetworkIdArgs = {
  networkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV1ConnectNetworksNetworkIdResponse = z.void();

export type UseDeleteApiV1ConnectNetworksNetworkIdResponse = void;

export type DeleteApiV1ConnectNetworksNetworkIdBody = void;

export const useDeleteApiV1ConnectNetworksNetworkId = (
  options: UseMutationOptions<
    UseDeleteApiV1ConnectNetworksNetworkIdResponse,
    Error,
    UseDeleteApiV1ConnectNetworksNetworkIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1ConnectNetworksNetworkIdArgs) =>
      apiFetch(
        buildUrl("/v1/connect/networks/{networkId}", {
          networkId: args.networkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1ConnectNetworksNetworkIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["networking"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
