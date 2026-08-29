import {
  sandboxPublicRoute,
  type SandboxPublicRoute,
} from "packages/models/src/sandboxPublicRoute.generated.ts";
import { z } from "zod";
import { namedSandbox, type NamedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { session, type Session } from "packages/models/src/session.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV2SandboxesNameArgs = {
  name: string;
  projectId?: string | undefined;
  resume?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
    runtime?: ("node22" | "node24" | "node26" | "python3.13") | undefined;
    timeout?: number | undefined;
    persistent?: boolean | undefined;
    snapshotExpiration?: (unknown | number) | undefined;
    keepLastSnapshots?:
      | (
          | string
          | {
              count: number;
              expiration?: (unknown | number) | undefined;
              deleteEvicted?: boolean | undefined;
            }
        )
      | undefined;
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
    env?: Record<string, string> | undefined;
    currentSnapshotId?: string | undefined;
    tags?: Record<string, string> | undefined;
  };
};

export const usePatchApiV2SandboxesNameResponse = z.union([
  z.object({ routes: z.array(sandboxPublicRoute), sandbox: namedSandbox }),
  z.object({
    sandbox: namedSandbox,
    session: session,
    routes: z.array(sandboxPublicRoute),
    resumed: z.boolean(),
  }),
]);

export type UsePatchApiV2SandboxesNameResponse =
  | { routes: Array<SandboxPublicRoute>; sandbox: NamedSandbox }
  | {
      sandbox: NamedSandbox;
      session: Session;
      routes: Array<SandboxPublicRoute>;
      resumed: boolean;
    };

export type PatchApiV2SandboxesNameBody = {
  resources?: { vcpus?: number | undefined; memory?: number | undefined } | undefined;
  runtime?: ("node22" | "node24" | "node26" | "python3.13") | undefined;
  timeout?: number | undefined;
  persistent?: boolean | undefined;
  snapshotExpiration?: (unknown | number) | undefined;
  keepLastSnapshots?:
    | (
        | string
        | {
            count: number;
            expiration?: (unknown | number) | undefined;
            deleteEvicted?: boolean | undefined;
          }
      )
    | undefined;
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
  env?: Record<string, string> | undefined;
  currentSnapshotId?: string | undefined;
  tags?: Record<string, string> | undefined;
};

export const usePatchApiV2SandboxesName = (
  options: UseMutationOptions<
    UsePatchApiV2SandboxesNameResponse,
    Error,
    UsePatchApiV2SandboxesNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV2SandboxesNameArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/{name}", {
          name: args.name,
          projectId: args.projectId,
          resume: args.resume,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV2SandboxesNameResponse,
        {
          method: "PATCH",
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
