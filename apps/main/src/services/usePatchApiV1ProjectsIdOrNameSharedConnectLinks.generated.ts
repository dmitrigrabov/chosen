import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsIdOrNameSharedConnectLinksArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | { builds: boolean; regions?: Array<string> | undefined }
    | { builds?: boolean | undefined; regions: Array<string> };
};

export const usePatchApiV1ProjectsIdOrNameSharedConnectLinksResponse = z.array(
  z.object({
    envId: z.union([z.string(), z.enum(["preview", "production"])]),
    connectConfigurationId: z.string(),
    dc: z.string().optional(),
    passive: z.boolean(),
    buildsEnabled: z.boolean(),
    aws: z
      .object({ subnetIds: z.array(z.string()), securityGroupId: z.string().optional() })
      .optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
  }),
);

export type UsePatchApiV1ProjectsIdOrNameSharedConnectLinksResponse = Array<{
  envId: string | "preview" | "production";
  connectConfigurationId: string;
  dc?: string | undefined;
  passive: boolean;
  buildsEnabled: boolean;
  aws?: { subnetIds: Array<string>; securityGroupId?: string | undefined } | undefined;
  createdAt: number;
  updatedAt: number;
}>;

export type PatchApiV1ProjectsIdOrNameSharedConnectLinksBody =
  | { builds: boolean; regions?: Array<string> | undefined }
  | { builds?: boolean | undefined; regions: Array<string> };

export const usePatchApiV1ProjectsIdOrNameSharedConnectLinks = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsIdOrNameSharedConnectLinksResponse,
    Error,
    UsePatchApiV1ProjectsIdOrNameSharedConnectLinksArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsIdOrNameSharedConnectLinksArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/shared-connect-links", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsIdOrNameSharedConnectLinksResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["networking", "static-ips"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
