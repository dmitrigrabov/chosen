import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1TeamsTeamIdRequestArgs = {
  teamId: string;
  body: {
    joinedFrom: {
      origin:
        | "import"
        | "teams"
        | "github"
        | "gitlab"
        | "bitbucket"
        | "feedback"
        | "organization-teams";
      commitId?: string | undefined;
      repoId?: string | undefined;
      repoPath?: string | undefined;
      gitUserId?: (string | number) | undefined;
      gitUserLogin?: string | undefined;
    };
  };
};

export const useCreateApiV1TeamsTeamIdRequestResponse = z.object({
  teamSlug: z.string(),
  teamName: z.string(),
  confirmed: z.boolean().optional(),
  joinedFrom: z
    .object({
      origin: z.enum([
        "account-update",
        "bitbucket",
        "dsync",
        "feedback",
        "github",
        "gitlab",
        "import",
        "link",
        "mail",
        "nsnb-auto-approve",
        "nsnb-hobby-upgrade",
        "nsnb-invite",
        "nsnb-redeploy",
        "nsnb-redeploy-attribution-card",
        "nsnb-request-access",
        "nsnb-viewer-upgrade",
        "organization-teams",
        "saml",
        "teams",
      ]),
      commitId: z.string().optional(),
      repoId: z.string().optional(),
      repoPath: z.string().optional(),
      gitUserId: z.union([z.string(), z.number()]).optional(),
      gitUserLogin: z.string().optional(),
      ssoUserId: z.string().optional(),
      ssoConnectedAt: z.number().optional(),
      idpUserId: z.string().optional(),
      dsyncUserId: z.string().optional(),
      dsyncConnectedAt: z.number().optional(),
    })
    .optional(),
  accessRequestedAt: z.number().optional(),
  github: z.object({ login: z.string().optional() }).nullable(),
  gitlab: z.object({ login: z.string().optional() }).nullable(),
  bitbucket: z.object({ login: z.string().optional() }).nullable(),
});

export type UseCreateApiV1TeamsTeamIdRequestResponse = {
  teamSlug: string;
  teamName: string;
  confirmed?: boolean | undefined;
  joinedFrom?:
    | {
        origin:
          | "account-update"
          | "bitbucket"
          | "dsync"
          | "feedback"
          | "github"
          | "gitlab"
          | "import"
          | "link"
          | "mail"
          | "nsnb-auto-approve"
          | "nsnb-hobby-upgrade"
          | "nsnb-invite"
          | "nsnb-redeploy"
          | "nsnb-redeploy-attribution-card"
          | "nsnb-request-access"
          | "nsnb-viewer-upgrade"
          | "organization-teams"
          | "saml"
          | "teams";
        commitId?: string | undefined;
        repoId?: string | undefined;
        repoPath?: string | undefined;
        gitUserId?: (string | number) | undefined;
        gitUserLogin?: string | undefined;
        ssoUserId?: string | undefined;
        ssoConnectedAt?: number | undefined;
        idpUserId?: string | undefined;
        dsyncUserId?: string | undefined;
        dsyncConnectedAt?: number | undefined;
      }
    | undefined;
  accessRequestedAt?: number | undefined;
  github: { login?: string | undefined } | null;
  gitlab: { login?: string | undefined } | null;
  bitbucket: { login?: string | undefined } | null;
};

export type CreateApiV1TeamsTeamIdRequestBody = {
  joinedFrom: {
    origin:
      | "import"
      | "teams"
      | "github"
      | "gitlab"
      | "bitbucket"
      | "feedback"
      | "organization-teams";
    commitId?: string | undefined;
    repoId?: string | undefined;
    repoPath?: string | undefined;
    gitUserId?: (string | number) | undefined;
    gitUserLogin?: string | undefined;
  };
};

export const useCreateApiV1TeamsTeamIdRequest = (
  options: UseMutationOptions<
    UseCreateApiV1TeamsTeamIdRequestResponse,
    Error,
    UseCreateApiV1TeamsTeamIdRequestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1TeamsTeamIdRequestArgs) =>
      apiFetch(
        buildUrl("/v1/teams/{teamId}/request", { teamId: args.teamId }),
        useCreateApiV1TeamsTeamIdRequestResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["teams"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
