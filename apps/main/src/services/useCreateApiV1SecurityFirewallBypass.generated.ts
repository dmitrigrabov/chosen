import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1SecurityFirewallBypassArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        domain: string;
        projectScope?: boolean | undefined;
        sourceIp?: string | undefined;
        allSources?: boolean | undefined;
        ttl?: number | undefined;
        note?: string | undefined;
      }
    | {
        domain?: string | undefined;
        projectScope: boolean;
        sourceIp?: string | undefined;
        allSources?: boolean | undefined;
        ttl?: number | undefined;
        note?: string | undefined;
      };
};

export const useCreateApiV1SecurityFirewallBypassResponse = z.union([
  z.object({
    ok: z.boolean(),
    result: z.array(
      z.object({
        OwnerId: z.string(),
        Id: z.string(),
        Domain: z.string(),
        Ip: z.string().optional(),
        ProjectId: z.string(),
        Note: z.string(),
        IsProjectRule: z.boolean(),
      }),
    ),
    pagination: z.unknown(),
  }),
  z.object({
    ok: z.boolean(),
    result: z
      .array(
        z.object({
          OwnerId: z.string(),
          Id: z.string(),
          Domain: z.string(),
          Ip: z.string(),
          Action: z.enum(["block", "bypass"]).optional(),
          ProjectId: z.string().optional(),
          IsProjectRule: z.boolean().optional(),
          Note: z.string().optional(),
          CreatedAt: z.string(),
          ActorId: z.string().optional(),
          UpdatedAt: z.string(),
          UpdatedAtHour: z.string(),
          DeletedAt: z.string().optional(),
          ExpiresAt: z.number().nullable().optional(),
        }),
      )
      .optional(),
  }),
]);

export type UseCreateApiV1SecurityFirewallBypassResponse =
  | {
      ok: boolean;
      result: Array<{
        OwnerId: string;
        Id: string;
        Domain: string;
        Ip?: string | undefined;
        ProjectId: string;
        Note: string;
        IsProjectRule: boolean;
      }>;
      pagination: unknown;
    }
  | {
      ok: boolean;
      result?:
        | Array<{
            OwnerId: string;
            Id: string;
            Domain: string;
            Ip: string;
            Action?: ("block" | "bypass") | undefined;
            ProjectId?: string | undefined;
            IsProjectRule?: boolean | undefined;
            Note?: string | undefined;
            CreatedAt: string;
            ActorId?: string | undefined;
            UpdatedAt: string;
            UpdatedAtHour: string;
            DeletedAt?: string | undefined;
            ExpiresAt?: (number | null) | undefined;
          }>
        | undefined;
    };

export type CreateApiV1SecurityFirewallBypassBody =
  | {
      domain: string;
      projectScope?: boolean | undefined;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      ttl?: number | undefined;
      note?: string | undefined;
    }
  | {
      domain?: string | undefined;
      projectScope: boolean;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      ttl?: number | undefined;
      note?: string | undefined;
    };

export const useCreateApiV1SecurityFirewallBypass = (
  options: UseMutationOptions<
    UseCreateApiV1SecurityFirewallBypassResponse,
    Error,
    UseCreateApiV1SecurityFirewallBypassArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1SecurityFirewallBypassArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/bypass", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1SecurityFirewallBypassResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["security"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
