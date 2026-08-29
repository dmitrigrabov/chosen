import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiAliasesIdProtectionBypassArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | { ttl?: number | undefined; revoke?: { secret: string; regenerate: boolean } | undefined }
    | {
        scope:
          | { userId: string; email?: string | undefined; access: "denied" | "granted" }
          | { userId?: string | undefined; email: string; access: "denied" | "granted" };
      }
    | { override: { scope: "alias-protection-override"; action: "create" | "revoke" } };
};

export const usePatchApiAliasesIdProtectionBypassResponse = z.record(z.string(), z.unknown());

export type UsePatchApiAliasesIdProtectionBypassResponse = Record<string, unknown>;

export type PatchApiAliasesIdProtectionBypassBody =
  | { ttl?: number | undefined; revoke?: { secret: string; regenerate: boolean } | undefined }
  | {
      scope:
        | { userId: string; email?: string | undefined; access: "denied" | "granted" }
        | { userId?: string | undefined; email: string; access: "denied" | "granted" };
    }
  | { override: { scope: "alias-protection-override"; action: "create" | "revoke" } };

export const usePatchApiAliasesIdProtectionBypass = (
  options: UseMutationOptions<
    UsePatchApiAliasesIdProtectionBypassResponse,
    Error,
    UsePatchApiAliasesIdProtectionBypassArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiAliasesIdProtectionBypassArgs) =>
      apiFetch(
        buildUrl("/aliases/{id}/protection-bypass", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiAliasesIdProtectionBypassResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["aliases"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
