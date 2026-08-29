import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1SecurityFirewallBypassArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        domain: string;
        projectScope?: boolean | undefined;
        sourceIp?: string | undefined;
        allSources?: boolean | undefined;
        note?: string | undefined;
      }
    | {
        domain?: string | undefined;
        projectScope: boolean;
        sourceIp?: string | undefined;
        allSources?: boolean | undefined;
        note?: string | undefined;
      };
};

export const useDeleteApiV1SecurityFirewallBypassResponse = z.object({ ok: z.boolean() });

export type UseDeleteApiV1SecurityFirewallBypassResponse = { ok: boolean };

export type DeleteApiV1SecurityFirewallBypassBody =
  | {
      domain: string;
      projectScope?: boolean | undefined;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      note?: string | undefined;
    }
  | {
      domain?: string | undefined;
      projectScope: boolean;
      sourceIp?: string | undefined;
      allSources?: boolean | undefined;
      note?: string | undefined;
    };

export const useDeleteApiV1SecurityFirewallBypass = (
  options: UseMutationOptions<
    UseDeleteApiV1SecurityFirewallBypassResponse,
    Error,
    UseDeleteApiV1SecurityFirewallBypassArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1SecurityFirewallBypassArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/bypass", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1SecurityFirewallBypassResponse,
        {
          method: "DELETE",
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
