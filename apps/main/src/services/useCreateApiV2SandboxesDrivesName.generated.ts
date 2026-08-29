import { drive, type Drive } from "packages/models/src/drive.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesDrivesNameArgs = {
  name: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    projectId?: string | undefined;
    maxSizeBytes?: number | undefined;
    region?:
      | (
          | "iad1"
          | "sfo1"
          | "cle1"
          | "cdg1"
          | "fra1"
          | "arn1"
          | "sin1"
          | "pdx1"
          | "lhr1"
          | "icn1"
          | "bom1"
          | "cpt1"
          | "dub1"
          | "gru1"
          | "hkg1"
          | "syd1"
          | "yul1"
          | "hnd1"
          | "kix1"
        )
      | undefined;
  };
};

export const useCreateApiV2SandboxesDrivesNameResponse = z.object({ drive: drive });

export type UseCreateApiV2SandboxesDrivesNameResponse = { drive: Drive };

export type CreateApiV2SandboxesDrivesNameBody = {
  projectId?: string | undefined;
  maxSizeBytes?: number | undefined;
  region?:
    | (
        | "iad1"
        | "sfo1"
        | "cle1"
        | "cdg1"
        | "fra1"
        | "arn1"
        | "sin1"
        | "pdx1"
        | "lhr1"
        | "icn1"
        | "bom1"
        | "cpt1"
        | "dub1"
        | "gru1"
        | "hkg1"
        | "syd1"
        | "yul1"
        | "hnd1"
        | "kix1"
      )
    | undefined;
};

export const useCreateApiV2SandboxesDrivesName = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesDrivesNameResponse,
    Error,
    UseCreateApiV2SandboxesDrivesNameArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesDrivesNameArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/drives/{name}", {
          name: args.name,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesDrivesNameResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
