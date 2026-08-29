import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV6DomainsDomainArgs = {
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV6DomainsDomainResponse = z.object({ uid: z.string() });

export type UseDeleteApiV6DomainsDomainResponse = { uid: string };

export type DeleteApiV6DomainsDomainBody = void;

export const useDeleteApiV6DomainsDomain = (
  options: UseMutationOptions<
    UseDeleteApiV6DomainsDomainResponse,
    Error,
    UseDeleteApiV6DomainsDomainArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV6DomainsDomainArgs) =>
      apiFetch(
        buildUrl("/v6/domains/{domain}", {
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV6DomainsDomainResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
