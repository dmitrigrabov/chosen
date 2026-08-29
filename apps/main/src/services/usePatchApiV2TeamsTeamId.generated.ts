import { team, type Team } from "packages/models/src/team.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV2TeamsTeamIdArgs = {
  teamId: string;
  slug?: string | undefined;
  body: {
    avatar?: (string | null) | undefined;
    description?: string | undefined;
    emailDomain?: (unknown | null) | undefined;
    name?: string | undefined;
    previewDeploymentSuffix?: (string | null) | undefined;
    regenerateInviteCode?: boolean | undefined;
    saml?:
      | {
          enforced?: boolean | undefined;
          roles?:
            | Record<
                string,
                | "OWNER"
                | "MEMBER"
                | "DEVELOPER"
                | "SECURITY"
                | "BILLING"
                | "VIEWER"
                | "VIEWER_FOR_PLUS"
                | "CONTRIBUTOR"
                | { accessGroupId: string }
              >
            | undefined;
        }
      | undefined;
    slug?: string | undefined;
    enablePreviewFeedback?: string | undefined;
    enableProductionFeedback?: string | undefined;
    sensitiveEnvironmentVariablePolicy?: string | undefined;
    disjunctiveProductionSecretPolicy?: string | undefined;
    remoteCaching?: { enabled?: boolean | undefined } | undefined;
    hideIpAddresses?: boolean | undefined;
    hideIpAddressesInLogDrains?: boolean | undefined;
    dpAccessRequestsMode?: ("all" | "none" | "email-domain") | undefined;
    requireVerifiedCommits?: boolean | undefined;
    disableRepositoryDispatchEvents?: boolean | undefined;
    defaultDeploymentProtection?:
      | {
          passwordProtection?:
            | ({
                deploymentType:
                  | "all"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "all_except_custom_domains";
                password?: (string | null) | undefined;
              } | null)
            | undefined;
          ssoProtection?:
            | ({
                deploymentType:
                  | "all"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "all_except_custom_domains";
              } | null)
            | undefined;
        }
      | undefined;
    defaultPassport?:
      | ({
          connectorId: string;
          deploymentType?:
            | (
                | "all"
                | "preview"
                | "prod_deployment_urls_and_all_previews"
                | "all_except_custom_domains"
              )
            | undefined;
        } | null)
      | undefined;
    defaultExpirationSettings?:
      | {
          expiration?:
            | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
            | undefined;
          expirationProduction?:
            | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
            | undefined;
          expirationCanceled?:
            | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
            | undefined;
          expirationErrored?:
            | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
            | undefined;
        }
      | undefined;
    deploymentPolicy?:
      | (
          | {
              gitSources?:
                | (
                    | Array<{
                        enabled: boolean;
                        environments: Array<
                          | { type: "system"; target: "production" | "preview" }
                          | { type: "custom"; environmentId: string }
                        >;
                        sources: Array<
                          | {
                              provider: "github" | "bitbucket";
                              org: string;
                              repo?: string | undefined;
                            }
                          | { provider: "gitlab"; namespace: string; project?: string | undefined }
                        >;
                      }>
                    | string
                  )
                | undefined;
              deploymentSources?:
                | (
                    | Array<{
                        enabled: boolean;
                        environments: Array<
                          | { type: "system"; target: "production" | "preview" }
                          | { type: "custom"; environmentId: string }
                        >;
                        sources: Array<
                          "git" | "cli" | "rest-api" | "deploy-hook" | "integration" | "v0"
                        >;
                      }>
                    | string
                  )
                | undefined;
            }
          | string
        )
      | undefined;
    strictDeploymentProtectionSettings?: { enabled: boolean } | undefined;
    strictShareableLinks?: { enabled: boolean } | undefined;
    strictPasswordProtectionSettings?: { enabled: boolean } | undefined;
    nsnbConfig?:
      | ({ preference: "auto-approval" | "manual-approval" | "block" } | string)
      | undefined;
    defaultProjectJobs?:
      | (
          | {
              lint?: { targets: Array<string> } | undefined;
              typecheck?: { targets: Array<string> } | undefined;
            }
          | string
        )
      | undefined;
    resourceConfig?:
      | {
          buildMachine?:
            | { default?: ("basic" | "enhanced" | "turbo" | "standard" | "elastic") | undefined }
            | undefined;
        }
      | undefined;
  };
};

export type PatchApiV2TeamsTeamIdBody = {
  avatar?: (string | null) | undefined;
  description?: string | undefined;
  emailDomain?: (unknown | null) | undefined;
  name?: string | undefined;
  previewDeploymentSuffix?: (string | null) | undefined;
  regenerateInviteCode?: boolean | undefined;
  saml?:
    | {
        enforced?: boolean | undefined;
        roles?:
          | Record<
              string,
              | "OWNER"
              | "MEMBER"
              | "DEVELOPER"
              | "SECURITY"
              | "BILLING"
              | "VIEWER"
              | "VIEWER_FOR_PLUS"
              | "CONTRIBUTOR"
              | { accessGroupId: string }
            >
          | undefined;
      }
    | undefined;
  slug?: string | undefined;
  enablePreviewFeedback?: string | undefined;
  enableProductionFeedback?: string | undefined;
  sensitiveEnvironmentVariablePolicy?: string | undefined;
  disjunctiveProductionSecretPolicy?: string | undefined;
  remoteCaching?: { enabled?: boolean | undefined } | undefined;
  hideIpAddresses?: boolean | undefined;
  hideIpAddressesInLogDrains?: boolean | undefined;
  dpAccessRequestsMode?: ("all" | "none" | "email-domain") | undefined;
  requireVerifiedCommits?: boolean | undefined;
  disableRepositoryDispatchEvents?: boolean | undefined;
  defaultDeploymentProtection?:
    | {
        passwordProtection?:
          | ({
              deploymentType:
                | "all"
                | "preview"
                | "prod_deployment_urls_and_all_previews"
                | "all_except_custom_domains";
              password?: (string | null) | undefined;
            } | null)
          | undefined;
        ssoProtection?:
          | ({
              deploymentType:
                | "all"
                | "preview"
                | "prod_deployment_urls_and_all_previews"
                | "all_except_custom_domains";
            } | null)
          | undefined;
      }
    | undefined;
  defaultPassport?:
    | ({
        connectorId: string;
        deploymentType?:
          | (
              | "all"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | "all_except_custom_domains"
            )
          | undefined;
      } | null)
    | undefined;
  defaultExpirationSettings?:
    | {
        expiration?:
          | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationProduction?:
          | ("3y" | "2y" | "1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationCanceled?:
          | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
        expirationErrored?:
          | ("1y" | "6m" | "3m" | "2m" | "1m" | "2w" | "1w" | "1d" | "unlimited")
          | undefined;
      }
    | undefined;
  deploymentPolicy?:
    | (
        | {
            gitSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        | {
                            provider: "github" | "bitbucket";
                            org: string;
                            repo?: string | undefined;
                          }
                        | { provider: "gitlab"; namespace: string; project?: string | undefined }
                      >;
                    }>
                  | string
                )
              | undefined;
            deploymentSources?:
              | (
                  | Array<{
                      enabled: boolean;
                      environments: Array<
                        | { type: "system"; target: "production" | "preview" }
                        | { type: "custom"; environmentId: string }
                      >;
                      sources: Array<
                        "git" | "cli" | "rest-api" | "deploy-hook" | "integration" | "v0"
                      >;
                    }>
                  | string
                )
              | undefined;
          }
        | string
      )
    | undefined;
  strictDeploymentProtectionSettings?: { enabled: boolean } | undefined;
  strictShareableLinks?: { enabled: boolean } | undefined;
  strictPasswordProtectionSettings?: { enabled: boolean } | undefined;
  nsnbConfig?: ({ preference: "auto-approval" | "manual-approval" | "block" } | string) | undefined;
  defaultProjectJobs?:
    | (
        | {
            lint?: { targets: Array<string> } | undefined;
            typecheck?: { targets: Array<string> } | undefined;
          }
        | string
      )
    | undefined;
  resourceConfig?:
    | {
        buildMachine?:
          | { default?: ("basic" | "enhanced" | "turbo" | "standard" | "elastic") | undefined }
          | undefined;
      }
    | undefined;
};

export const usePatchApiV2TeamsTeamId = (
  options: UseMutationOptions<Team, Error, UsePatchApiV2TeamsTeamIdArgs, unknown> = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV2TeamsTeamIdArgs) =>
      apiFetch(buildUrl("/v2/teams/{teamId}", { teamId: args.teamId, slug: args.slug }), team, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["teams"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
