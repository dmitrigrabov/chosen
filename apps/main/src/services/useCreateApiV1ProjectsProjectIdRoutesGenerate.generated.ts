import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsProjectIdRoutesGenerateArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    prompt: string;
    currentRoute?:
      | {
          name?: string | undefined;
          description?: string | undefined;
          pathCondition: { value?: string | undefined; syntax?: string | undefined };
          conditions?:
            | Array<{
                field?: string | undefined;
                operator?: string | undefined;
                key?: string | undefined;
                value?: string | undefined;
                missing?: boolean | undefined;
              }>
            | undefined;
          actions: Array<{
            type?: string | undefined;
            subType?: string | undefined;
            dest?: string | undefined;
            status?: number | undefined;
            headers?:
              | Array<{
                  key?: string | undefined;
                  value?: string | undefined;
                  op?: string | undefined;
                }>
              | undefined;
          }>;
        }
      | undefined;
  };
};

export const useCreateApiV1ProjectsProjectIdRoutesGenerateResponse = z.object({
  route: z
    .object({
      name: z.string(),
      description: z.string(),
      pathCondition: z.object({
        value: z.string(),
        syntax: z.enum(["equals", "path-to-regexp", "regex"]),
      }),
      conditions: z
        .array(
          z.object({
            field: z.enum(["cookie", "header", "host", "query"]),
            operator: z.enum(["contains", "eq", "exists", "re"]),
            key: z.string().optional(),
            value: z.string().optional(),
            missing: z.boolean(),
          }),
        )
        .optional(),
      actions: z.array(
        z.object({
          type: z.enum(["modify", "redirect", "rewrite", "set-status"]),
          subType: z
            .enum(["response-headers", "transform-request-header", "transform-request-query"])
            .optional(),
          dest: z.string().optional(),
          status: z.number().optional(),
          headers: z
            .array(
              z.object({
                key: z.string(),
                value: z.string().optional(),
                op: z.enum(["append", "delete", "set"]),
              }),
            )
            .optional(),
        }),
      ),
    })
    .optional(),
  error: z.string().optional(),
});

export type UseCreateApiV1ProjectsProjectIdRoutesGenerateResponse = {
  route?:
    | {
        name: string;
        description: string;
        pathCondition: { value: string; syntax: "equals" | "path-to-regexp" | "regex" };
        conditions?:
          | Array<{
              field: "cookie" | "header" | "host" | "query";
              operator: "contains" | "eq" | "exists" | "re";
              key?: string | undefined;
              value?: string | undefined;
              missing: boolean;
            }>
          | undefined;
        actions: Array<{
          type: "modify" | "redirect" | "rewrite" | "set-status";
          subType?:
            | ("response-headers" | "transform-request-header" | "transform-request-query")
            | undefined;
          dest?: string | undefined;
          status?: number | undefined;
          headers?:
            | Array<{ key: string; value?: string | undefined; op: "append" | "delete" | "set" }>
            | undefined;
        }>;
      }
    | undefined;
  error?: string | undefined;
};

export type CreateApiV1ProjectsProjectIdRoutesGenerateBody = {
  prompt: string;
  currentRoute?:
    | {
        name?: string | undefined;
        description?: string | undefined;
        pathCondition: { value?: string | undefined; syntax?: string | undefined };
        conditions?:
          | Array<{
              field?: string | undefined;
              operator?: string | undefined;
              key?: string | undefined;
              value?: string | undefined;
              missing?: boolean | undefined;
            }>
          | undefined;
        actions: Array<{
          type?: string | undefined;
          subType?: string | undefined;
          dest?: string | undefined;
          status?: number | undefined;
          headers?:
            | Array<{
                key?: string | undefined;
                value?: string | undefined;
                op?: string | undefined;
              }>
            | undefined;
        }>;
      }
    | undefined;
};

export const useCreateApiV1ProjectsProjectIdRoutesGenerate = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsProjectIdRoutesGenerateResponse,
    Error,
    UseCreateApiV1ProjectsProjectIdRoutesGenerateArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsProjectIdRoutesGenerateArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/routes/generate", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsProjectIdRoutesGenerateResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["project-routes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
