import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV3DomainsDomainArgs = {
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        op?: string | undefined;
        renew?: boolean | undefined;
        customNameservers?: Array<string> | undefined;
        zone?: boolean | undefined;
        echMode?: ("auto" | "disabled") | undefined;
      }
    | { op?: string | undefined; destination?: string | undefined };
};

export const usePatchApiV3DomainsDomainResponse = z.union([
  z.object({ moved: z.boolean() }),
  z.object({ moved: z.boolean(), token: z.string() }),
  z.object({
    renew: z.boolean().optional(),
    customNameservers: z.array(z.string()).optional(),
    zone: z.boolean().optional(),
    echMode: z.enum(["auto", "disabled", "enabled"]),
  }),
]);

export type UsePatchApiV3DomainsDomainResponse =
  | { moved: boolean }
  | { moved: boolean; token: string }
  | {
      renew?: boolean | undefined;
      customNameservers?: Array<string> | undefined;
      zone?: boolean | undefined;
      echMode: "auto" | "disabled" | "enabled";
    };

export type PatchApiV3DomainsDomainBody =
  | {
      op?: string | undefined;
      renew?: boolean | undefined;
      customNameservers?: Array<string> | undefined;
      zone?: boolean | undefined;
      echMode?: ("auto" | "disabled") | undefined;
    }
  | { op?: string | undefined; destination?: string | undefined };

export const usePatchApiV3DomainsDomain = (
  options: UseMutationOptions<
    UsePatchApiV3DomainsDomainResponse,
    Error,
    UsePatchApiV3DomainsDomainArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV3DomainsDomainArgs) =>
      apiFetch(
        buildUrl("/v3/domains/{domain}", {
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV3DomainsDomainResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["domains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
