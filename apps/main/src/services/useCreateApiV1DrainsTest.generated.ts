import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1DrainsTestArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    schemas: Record<string, { version: string }>;
    delivery:
      | {
          type: string;
          endpoint: string;
          compression?: ("gzip" | "none") | undefined;
          encoding: "json" | "ndjson";
          headers: Record<string, string>;
          secret?: string | undefined;
        }
      | {
          type: string;
          endpoint: { traces: string };
          encoding: "proto" | "json";
          headers: Record<string, string>;
          secret?: string | undefined;
        }
      | {
          type: string;
          endpoint: string;
          encoding: "json" | "ndjson";
          compression: "none";
          fileStructure: "hive";
          roleArn: string;
          region: string;
          serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
          objectAcl?: ("private" | "bucket-owner-read" | "bucket-owner-full-control") | undefined;
        };
  };
};

export const useCreateApiV1DrainsTestResponse = z.union([
  z.object({}),
  z.object({ status: z.string(), error: z.string(), endpoint: z.string() }),
]);

export type UseCreateApiV1DrainsTestResponse =
  | Record<string, never>
  | { status: string; error: string; endpoint: string };

export type CreateApiV1DrainsTestBody = {
  schemas: Record<string, { version: string }>;
  delivery:
    | {
        type: string;
        endpoint: string;
        compression?: ("gzip" | "none") | undefined;
        encoding: "json" | "ndjson";
        headers: Record<string, string>;
        secret?: string | undefined;
      }
    | {
        type: string;
        endpoint: { traces: string };
        encoding: "proto" | "json";
        headers: Record<string, string>;
        secret?: string | undefined;
      }
    | {
        type: string;
        endpoint: string;
        encoding: "json" | "ndjson";
        compression: "none";
        fileStructure: "hive";
        roleArn: string;
        region: string;
        serverSideEncryption?: ("AES256" | "aws:kms" | "aws:kms:dsse") | undefined;
        objectAcl?: ("private" | "bucket-owner-read" | "bucket-owner-full-control") | undefined;
      };
};

export const useCreateApiV1DrainsTest = (
  options: UseMutationOptions<
    UseCreateApiV1DrainsTestResponse,
    Error,
    UseCreateApiV1DrainsTestArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1DrainsTestArgs) =>
      apiFetch(
        buildUrl("/v1/drains/test", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1DrainsTestResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["drains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
