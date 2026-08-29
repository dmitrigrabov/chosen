import { session, type Session } from "packages/models/src/session.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdNetworkPolicyArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
        allowedDomains?: Array<string> | undefined;
        allowedCIDRs?: Array<string> | undefined;
        deniedCIDRs?: Array<string> | undefined;
        injectionRules?:
          | Array<{
              domain: string;
              headers: Record<string, string>;
              match?:
                | {
                    path?:
                      | { exact?: string | undefined; startsWith?: string | undefined }
                      | undefined;
                    method?: Array<string> | undefined;
                    queryString?:
                      | Array<{
                          key?:
                            | { exact?: string | undefined; startsWith?: string | undefined }
                            | undefined;
                          value?:
                            | { exact?: string | undefined; startsWith?: string | undefined }
                            | undefined;
                        }>
                      | undefined;
                    headers?:
                      | Array<{
                          key?:
                            | { exact?: string | undefined; startsWith?: string | undefined }
                            | undefined;
                          value?:
                            | { exact?: string | undefined; startsWith?: string | undefined }
                            | undefined;
                        }>
                      | undefined;
                  }
                | undefined;
            }>
          | undefined;
      }
    | {
        allow?:
          | (
              | Array<string>
              | Record<
                  string,
                  Array<{
                    match?:
                      | {
                          path?:
                            | { exact?: string | undefined; startsWith?: string | undefined }
                            | undefined;
                          method?: Array<string> | undefined;
                          queryString?:
                            | Array<{
                                key?:
                                  | { exact?: string | undefined; startsWith?: string | undefined }
                                  | undefined;
                                value?:
                                  | { exact?: string | undefined; startsWith?: string | undefined }
                                  | undefined;
                              }>
                            | undefined;
                          headers?:
                            | Array<{
                                key?:
                                  | { exact?: string | undefined; startsWith?: string | undefined }
                                  | undefined;
                                value?:
                                  | { exact?: string | undefined; startsWith?: string | undefined }
                                  | undefined;
                              }>
                            | undefined;
                        }
                      | undefined;
                    transform?: Array<{ headers?: Record<string, string> | undefined }> | undefined;
                    forwardURL?: string | undefined;
                  }>
                >
            )
          | undefined;
        subnets?:
          | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
          | undefined;
      };
};

export const useCreateApiV2SandboxesSessionsSessionIdNetworkPolicyResponse = z.object({
  session: session,
});

export type UseCreateApiV2SandboxesSessionsSessionIdNetworkPolicyResponse = { session: Session };

export type CreateApiV2SandboxesSessionsSessionIdNetworkPolicyBody =
  | {
      mode: "allow-all" | "deny-all" | "custom" | "default-allow" | "default-deny";
      allowedDomains?: Array<string> | undefined;
      allowedCIDRs?: Array<string> | undefined;
      deniedCIDRs?: Array<string> | undefined;
      injectionRules?:
        | Array<{
            domain: string;
            headers: Record<string, string>;
            match?:
              | {
                  path?:
                    | { exact?: string | undefined; startsWith?: string | undefined }
                    | undefined;
                  method?: Array<string> | undefined;
                  queryString?:
                    | Array<{
                        key?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        value?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                      }>
                    | undefined;
                  headers?:
                    | Array<{
                        key?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        value?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                      }>
                    | undefined;
                }
              | undefined;
          }>
        | undefined;
    }
  | {
      allow?:
        | (
            | Array<string>
            | Record<
                string,
                Array<{
                  match?:
                    | {
                        path?:
                          | { exact?: string | undefined; startsWith?: string | undefined }
                          | undefined;
                        method?: Array<string> | undefined;
                        queryString?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                        headers?:
                          | Array<{
                              key?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                              value?:
                                | { exact?: string | undefined; startsWith?: string | undefined }
                                | undefined;
                            }>
                          | undefined;
                      }
                    | undefined;
                  transform?: Array<{ headers?: Record<string, string> | undefined }> | undefined;
                  forwardURL?: string | undefined;
                }>
              >
          )
        | undefined;
      subnets?: { allow?: Array<string> | undefined; deny?: Array<string> | undefined } | undefined;
    };

export const useCreateApiV2SandboxesSessionsSessionIdNetworkPolicy = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdNetworkPolicyResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdNetworkPolicyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdNetworkPolicyArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/network-policy", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdNetworkPolicyResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
