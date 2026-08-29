import { namedSandbox, type NamedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { session, type Session } from "packages/models/src/session.generated.ts";
import {
  sandboxPublicRoute,
  type SandboxPublicRoute,
} from "packages/models/src/sandboxPublicRoute.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesNameForkArgs = {
  name: string;
  projectId?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    networkPolicy?:
      | (
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
                                        | {
                                            exact?: string | undefined;
                                            startsWith?: string | undefined;
                                          }
                                        | undefined;
                                      value?:
                                        | {
                                            exact?: string | undefined;
                                            startsWith?: string | undefined;
                                          }
                                        | undefined;
                                    }>
                                  | undefined;
                                headers?:
                                  | Array<{
                                      key?:
                                        | {
                                            exact?: string | undefined;
                                            startsWith?: string | undefined;
                                          }
                                        | undefined;
                                      value?:
                                        | {
                                            exact?: string | undefined;
                                            startsWith?: string | undefined;
                                          }
                                        | undefined;
                                    }>
                                  | undefined;
                              }
                            | undefined;
                          transform?:
                            | Array<{ headers?: Record<string, string> | undefined }>
                            | undefined;
                          forwardURL?: string | undefined;
                        }>
                      >
                  )
                | undefined;
              subnets?:
                | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
                | undefined;
            }
        )
      | undefined;
    resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
    image?: string | undefined;
    timeout?: number | undefined;
    env?: Record<string, string> | undefined;
    mounts?:
      | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
      | undefined;
    region?:
      | (
          | "iad1"
          | "sfo1"
          | "cle1"
          | "cdg1"
          | "fra1"
          | "arn1"
          | "sin1"
          | "pdx1"
          | "lhr1"
          | "icn1"
          | "bom1"
          | "cpt1"
          | "dub1"
          | "gru1"
          | "hkg1"
          | "syd1"
          | "yul1"
          | "hnd1"
          | "kix1"
        )
      | undefined;
    failoverRegions?:
      | Array<
          | "iad1"
          | "sfo1"
          | "cle1"
          | "cdg1"
          | "fra1"
          | "arn1"
          | "sin1"
          | "pdx1"
          | "lhr1"
          | "icn1"
          | "bom1"
          | "cpt1"
          | "dub1"
          | "gru1"
          | "hkg1"
          | "syd1"
          | "yul1"
          | "hnd1"
          | "kix1"
        >
      | undefined;
    name?: string | undefined;
    persistent?: boolean | undefined;
    snapshotExpiration?: (unknown | number) | undefined;
    keepLastSnapshots?:
      | {
          count: number;
          expiration?: (unknown | number) | undefined;
          deleteEvicted?: boolean | undefined;
        }
      | undefined;
    tags?: Record<string, string> | undefined;
  };
};

export const useCreateApiV2SandboxesNameForkResponse = z.object({
  sandbox: namedSandbox,
  session: session,
  routes: z.array(sandboxPublicRoute),
});

export type UseCreateApiV2SandboxesNameForkResponse = {
  sandbox: NamedSandbox;
  session: Session;
  routes: Array<SandboxPublicRoute>;
};

export type CreateApiV2SandboxesNameForkBody = {
  networkPolicy?:
    | (
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
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                              headers?:
                                | Array<{
                                    key?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                    value?:
                                      | {
                                          exact?: string | undefined;
                                          startsWith?: string | undefined;
                                        }
                                      | undefined;
                                  }>
                                | undefined;
                            }
                          | undefined;
                        transform?:
                          | Array<{ headers?: Record<string, string> | undefined }>
                          | undefined;
                        forwardURL?: string | undefined;
                      }>
                    >
                )
              | undefined;
            subnets?:
              | { allow?: Array<string> | undefined; deny?: Array<string> | undefined }
              | undefined;
          }
      )
    | undefined;
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  image?: string | undefined;
  timeout?: number | undefined;
  env?: Record<string, string> | undefined;
  mounts?:
    | Record<string, { drive: string; mode?: ("read-only" | "read-write") | undefined }>
    | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
  failoverRegions?:
    | Array<
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      >
    | undefined;
  name?: string | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | {
        count: number;
        expiration?: (unknown | number) | undefined;
        deleteEvicted?: boolean | undefined;
      }
    | undefined;
  tags?: Record<string, string> | undefined;
};

export const useCreateApiV2SandboxesNameFork = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesNameForkResponse,
    Error,
    UseCreateApiV2SandboxesNameForkArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesNameForkArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/{name}/fork", {
          name: args.name,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesNameForkResponse,
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
