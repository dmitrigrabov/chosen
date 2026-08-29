import type { ConnectCreateConnectorRequest } from "packages/models/src/connectCreateConnectorRequest.generated.ts";
import {
  connectConnectorCreateResult,
  type ConnectConnectorCreateResult,
} from "packages/models/src/connectConnectorCreateResult.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ConnectConnectorsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: ConnectCreateConnectorRequest;
};

export const useCreateApiV1ConnectConnectors = (
  options: UseMutationOptions<
    ConnectConnectorCreateResult,
    Error,
    UseCreateApiV1ConnectConnectorsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ConnectConnectorsArgs) =>
      apiFetch(
        buildUrl("/v1/connect/connectors", { teamId: args.teamId, slug: args.slug }),
        connectConnectorCreateResult,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["connect"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
