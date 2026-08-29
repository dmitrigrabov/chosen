import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1SecurityFirewallConfigConfigVersionArgs = { configVersion: string };

export const useDeleteApiV1SecurityFirewallConfigConfigVersionResponse = z.literal("");

export type UseDeleteApiV1SecurityFirewallConfigConfigVersionResponse = "";

export type DeleteApiV1SecurityFirewallConfigConfigVersionBody = void;

export const useDeleteApiV1SecurityFirewallConfigConfigVersion = (
  options: UseMutationOptions<
    UseDeleteApiV1SecurityFirewallConfigConfigVersionResponse,
    Error,
    UseDeleteApiV1SecurityFirewallConfigConfigVersionArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1SecurityFirewallConfigConfigVersionArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/config/{configVersion}", {
          configVersion: args.configVersion,
        }),
        useDeleteApiV1SecurityFirewallConfigConfigVersionResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["security"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
