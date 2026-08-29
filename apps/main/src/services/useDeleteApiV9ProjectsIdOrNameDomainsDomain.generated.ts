import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV9ProjectsIdOrNameDomainsDomainArgs = {
  idOrName: string;
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { removeRedirects?: boolean | undefined };
};

export const useDeleteApiV9ProjectsIdOrNameDomainsDomainResponse = z.object({});

export type UseDeleteApiV9ProjectsIdOrNameDomainsDomainResponse = Record<string, never>;

export type DeleteApiV9ProjectsIdOrNameDomainsDomainBody = {
  removeRedirects?: boolean | undefined;
};

export const useDeleteApiV9ProjectsIdOrNameDomainsDomain = (
  options: UseMutationOptions<
    UseDeleteApiV9ProjectsIdOrNameDomainsDomainResponse,
    Error,
    UseDeleteApiV9ProjectsIdOrNameDomainsDomainArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV9ProjectsIdOrNameDomainsDomainArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/domains/{domain}", {
          idOrName: args.idOrName,
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV9ProjectsIdOrNameDomainsDomainResponse,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
