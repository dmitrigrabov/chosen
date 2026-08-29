import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1LogDrainsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    deliveryFormat: "json" | "ndjson";
    url: string;
    headers?: Record<string, string> | undefined;
    projectIds?: Array<string> | undefined;
    sources: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall">;
    environments?: Array<"preview" | "production"> | undefined;
    secret?: string | undefined;
    samplingRate?: number | undefined;
    name?: string | undefined;
  };
};

export const useCreateApiV1LogDrainsResponse = z.object({});

export type UseCreateApiV1LogDrainsResponse = Record<string, never>;

export type CreateApiV1LogDrainsBody = {
  deliveryFormat: "json" | "ndjson";
  url: string;
  headers?: Record<string, string> | undefined;
  projectIds?: Array<string> | undefined;
  sources: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall">;
  environments?: Array<"preview" | "production"> | undefined;
  secret?: string | undefined;
  samplingRate?: number | undefined;
  name?: string | undefined;
};

export const useCreateApiV1LogDrains = (
  options: UseMutationOptions<
    UseCreateApiV1LogDrainsResponse,
    Error,
    UseCreateApiV1LogDrainsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1LogDrainsArgs) =>
      apiFetch(
        buildUrl("/v1/log-drains", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1LogDrainsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["logDrains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
