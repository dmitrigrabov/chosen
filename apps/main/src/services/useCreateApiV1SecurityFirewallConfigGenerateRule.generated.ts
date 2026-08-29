import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1SecurityFirewallConfigGenerateRuleArgs = {
  projectId?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1SecurityFirewallConfigGenerateRuleResponse = z.object({
  rule: z
    .object({
      name: z.string(),
      description: z.string().optional(),
      active: z.boolean(),
      conditionGroup: z.array(
        z.object({
          conditions: z.array(
            z.object({
              type: z.string(),
              op: z.string(),
              neg: z.boolean().optional(),
              key: z.string().optional(),
              value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
            }),
          ),
        }),
      ),
      action: z.object({
        mitigate: z
          .object({
            action: z.string(),
            rateLimit: z
              .object({
                algo: z.string(),
                window: z.number(),
                limit: z.number(),
                keys: z.array(z.string()),
                action: z.string().nullable().optional(),
              })
              .nullable()
              .optional(),
            redirect: z
              .object({ location: z.string(), permanent: z.boolean() })
              .nullable()
              .optional(),
            actionDuration: z.string().nullable().optional(),
          })
          .optional(),
      }),
    })
    .optional(),
  error: z.string().optional(),
});

export type UseCreateApiV1SecurityFirewallConfigGenerateRuleResponse = {
  rule?:
    | {
        name: string;
        description?: string | undefined;
        active: boolean;
        conditionGroup: Array<{
          conditions: Array<{
            type: string;
            op: string;
            neg?: boolean | undefined;
            key?: string | undefined;
            value?: (string | number | Array<string>) | undefined;
          }>;
        }>;
        action: {
          mitigate?:
            | {
                action: string;
                rateLimit?:
                  | ({
                      algo: string;
                      window: number;
                      limit: number;
                      keys: Array<string>;
                      action?: (string | null) | undefined;
                    } | null)
                  | undefined;
                redirect?: ({ location: string; permanent: boolean } | null) | undefined;
                actionDuration?: (string | null) | undefined;
              }
            | undefined;
        };
      }
    | undefined;
  error?: string | undefined;
};

export type CreateApiV1SecurityFirewallConfigGenerateRuleBody = void;

export const useCreateApiV1SecurityFirewallConfigGenerateRule = (
  options: UseMutationOptions<
    UseCreateApiV1SecurityFirewallConfigGenerateRuleResponse,
    Error,
    UseCreateApiV1SecurityFirewallConfigGenerateRuleArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1SecurityFirewallConfigGenerateRuleArgs) =>
      apiFetch(
        buildUrl("/v1/security/firewall/config/generate-rule", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1SecurityFirewallConfigGenerateRuleResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["security"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
