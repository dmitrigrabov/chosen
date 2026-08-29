import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeArgs = {
  integrationConfigurationId: string;
  body: { token: string; client_secret: string; client_id?: string | undefined };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse =
  z.object({ revoked: z.boolean(), already_revoked: z.boolean() });

export type UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse = {
  revoked: boolean;
  already_revoked: boolean;
};

export type CreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeBody = {
  token: string;
  client_secret: string;
  client_id?: string | undefined;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevoke = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/credentials/revoke", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRevokeResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["marketplace"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
