import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1MicrofrontendsGroupArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    groupName: string;
    defaultApp: { projectId: string; defaultRoute?: string | undefined };
    otherApplications: Array<{ projectId: string; defaultRoute?: string | undefined }>;
  };
};

export const useCreateApiV1MicrofrontendsGroupResponse = z.object({
  newMicrofrontendsGroup: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    fallbackEnvironment: z.string(),
    enablePolyrepoBranchRouting: z.boolean(),
    createdAt: z.number(),
    updatedAt: z.number(),
  }),
});

export type UseCreateApiV1MicrofrontendsGroupResponse = {
  newMicrofrontendsGroup: {
    id: string;
    slug: string;
    name: string;
    fallbackEnvironment: string;
    enablePolyrepoBranchRouting: boolean;
    createdAt: number;
    updatedAt: number;
  };
};

export type CreateApiV1MicrofrontendsGroupBody = {
  groupName: string;
  defaultApp: { projectId: string; defaultRoute?: string | undefined };
  otherApplications: Array<{ projectId: string; defaultRoute?: string | undefined }>;
};

export const useCreateApiV1MicrofrontendsGroup = (
  options: UseMutationOptions<
    UseCreateApiV1MicrofrontendsGroupResponse,
    Error,
    UseCreateApiV1MicrofrontendsGroupArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1MicrofrontendsGroupArgs) =>
      apiFetch(
        buildUrl("/v1/microfrontends/group", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1MicrofrontendsGroupResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["microfrontends"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
