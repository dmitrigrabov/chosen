import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiV1IntegrationsSsoTokenArgs = {
  body:
    | {
        code: string;
        state?: string | undefined;
        client_id: string;
        client_secret: string;
        redirect_uri?: string | undefined;
        grant_type: "authorization_code";
      }
    | {
        refresh_token: string;
        client_id: string;
        client_secret: string;
        grant_type: "refresh_token";
      };
};

export const useCreateApiV1IntegrationsSsoTokenResponse = z.union([
  z.object({
    id_token: z.string(),
    token_type: z.string().nullable(),
    expires_in: z.number().optional(),
    access_token: z.string().nullable(),
    refresh_token: z.string().optional(),
  }),
  z.object({
    id_token: z.string(),
    token_type: z.string(),
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
  }),
]);

export type UseCreateApiV1IntegrationsSsoTokenResponse =
  | {
      id_token: string;
      token_type: string | null;
      expires_in?: number | undefined;
      access_token: string | null;
      refresh_token?: string | undefined;
    }
  | {
      id_token: string;
      token_type: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

export type CreateApiV1IntegrationsSsoTokenBody =
  | {
      code: string;
      state?: string | undefined;
      client_id: string;
      client_secret: string;
      redirect_uri?: string | undefined;
      grant_type: "authorization_code";
    }
  | {
      refresh_token: string;
      client_id: string;
      client_secret: string;
      grant_type: "refresh_token";
    };

export const useCreateApiV1IntegrationsSsoToken = (
  options: UseMutationOptions<
    UseCreateApiV1IntegrationsSsoTokenResponse,
    Error,
    UseCreateApiV1IntegrationsSsoTokenArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1IntegrationsSsoTokenArgs) =>
      apiFetch("/v1/integrations/sso/token", useCreateApiV1IntegrationsSsoTokenResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["authentication", "marketplace"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
