import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV7DomainsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        method?: string | undefined;
        name: string;
        cdnEnabled?: boolean | undefined;
        zone?: boolean | undefined;
      }
    | { method: string; name: string; token?: string | undefined };
};

export const useCreateApiV7DomainsResponse = z.object({
  domain: z.object({
    expiresAt: z.number().nullable(),
    verified: z.boolean(),
    nameservers: z.array(z.string()),
    intendedNameservers: z.array(z.string()),
    customNameservers: z.array(z.string()).optional(),
    creator: z.object({
      username: z.string(),
      email: z.string(),
      customerId: z.string().nullable().optional(),
      isDomainReseller: z.boolean().optional(),
      id: z.string(),
    }),
    echMode: z.enum(["auto", "disabled", "enabled"]),
    name: z.string(),
    teamId: z.string().nullable(),
    boughtAt: z.number().nullable(),
    createdAt: z.number(),
    id: z.string(),
    renew: z.boolean().optional(),
    serviceType: z.enum(["external", "na", "zeit.world"]),
    transferredAt: z.number().nullable().optional(),
    transferStartedAt: z.number().optional(),
    userId: z.string(),
  }),
});

export type UseCreateApiV7DomainsResponse = {
  domain: {
    expiresAt: number | null;
    verified: boolean;
    nameservers: Array<string>;
    intendedNameservers: Array<string>;
    customNameservers?: Array<string> | undefined;
    creator: {
      username: string;
      email: string;
      customerId?: (string | null) | undefined;
      isDomainReseller?: boolean | undefined;
      id: string;
    };
    echMode: "auto" | "disabled" | "enabled";
    name: string;
    teamId: string | null;
    boughtAt: number | null;
    createdAt: number;
    id: string;
    renew?: boolean | undefined;
    serviceType: "external" | "na" | "zeit.world";
    transferredAt?: (number | null) | undefined;
    transferStartedAt?: number | undefined;
    userId: string;
  };
};

export type CreateApiV7DomainsBody =
  | {
      method?: string | undefined;
      name: string;
      cdnEnabled?: boolean | undefined;
      zone?: boolean | undefined;
    }
  | { method: string; name: string; token?: string | undefined };

export const useCreateApiV7Domains = (
  options: UseMutationOptions<
    UseCreateApiV7DomainsResponse,
    Error,
    UseCreateApiV7DomainsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV7DomainsArgs) =>
      apiFetch(
        buildUrl("/v7/domains", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV7DomainsResponse,
        {
          method: "POST",
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
