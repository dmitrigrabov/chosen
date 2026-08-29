import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateArgs = {
  integrationConfigurationId: string;
  body: { client_secret: string; client_id?: string | undefined };
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse =
  z.object({
    scope: z.string(),
    expires_in: z.number(),
    access_token: z.string(),
    token_type: z.literal("oauth2-token"),
  });

export type UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse = {
  scope: string;
  expires_in: number;
  access_token: string;
  token_type: "oauth2-token";
};

export type CreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateBody = {
  client_secret: string;
  client_id?: string | undefined;
};

export const useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotate = (
  options: UseMutationOptions<
    UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse,
    Error,
    UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/installations/{integrationConfigurationId}/credentials/rotate", {
          integrationConfigurationId: args.integrationConfigurationId,
        }),
        useCreateApiV1InstallationsIntegrationConfigurationIdCredentialsRotateResponse,
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
