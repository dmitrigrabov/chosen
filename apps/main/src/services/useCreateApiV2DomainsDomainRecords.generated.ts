import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2DomainsDomainRecordsArgs = {
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        type: "A";
        name: string;
        ttl?: number | undefined;
        value: string;
        comment?: string | undefined;
      }
    | {
        type: "AAAA";
        name: string;
        ttl?: number | undefined;
        value: string;
        comment?: string | undefined;
      }
    | {
        type: "ALIAS";
        name: string;
        ttl?: number | undefined;
        value: string;
        comment?: string | undefined;
      }
    | {
        type: "CAA";
        name: string;
        ttl?: number | undefined;
        value: string;
        comment?: string | undefined;
      }
    | {
        type: "CNAME";
        name: string;
        ttl?: number | undefined;
        value?: string | undefined;
        comment?: string | undefined;
      }
    | {
        type: "MX";
        name: string;
        ttl?: number | undefined;
        value: string;
        mxPriority: number;
        comment?: string | undefined;
      }
    | {
        type: "SRV";
        ttl?: number | undefined;
        srv: {
          priority: number | null;
          weight: number | null;
          port: number | null;
          target: string;
        };
        comment?: string | undefined;
      }
    | { type: "TXT"; ttl?: number | undefined; value: string; comment?: string | undefined }
    | {
        type: "NS";
        name: string;
        ttl?: number | undefined;
        value?: string | undefined;
        comment?: string | undefined;
      }
    | {
        type: "HTTPS";
        ttl?: number | undefined;
        https: { priority: number | null; target: string; params?: string | undefined };
        comment?: string | undefined;
      };
};

export const useCreateApiV2DomainsDomainRecordsResponse = z.union([
  z.object({ uid: z.string().optional(), updated: z.number() }),
  z.object({ uid: z.string() }),
]);

export type UseCreateApiV2DomainsDomainRecordsResponse =
  | { uid?: string | undefined; updated: number }
  | { uid: string };

export type CreateApiV2DomainsDomainRecordsBody =
  | {
      type: "A";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "AAAA";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "ALIAS";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "CAA";
      name: string;
      ttl?: number | undefined;
      value: string;
      comment?: string | undefined;
    }
  | {
      type: "CNAME";
      name: string;
      ttl?: number | undefined;
      value?: string | undefined;
      comment?: string | undefined;
    }
  | {
      type: "MX";
      name: string;
      ttl?: number | undefined;
      value: string;
      mxPriority: number;
      comment?: string | undefined;
    }
  | {
      type: "SRV";
      ttl?: number | undefined;
      srv: { priority: number | null; weight: number | null; port: number | null; target: string };
      comment?: string | undefined;
    }
  | { type: "TXT"; ttl?: number | undefined; value: string; comment?: string | undefined }
  | {
      type: "NS";
      name: string;
      ttl?: number | undefined;
      value?: string | undefined;
      comment?: string | undefined;
    }
  | {
      type: "HTTPS";
      ttl?: number | undefined;
      https: { priority: number | null; target: string; params?: string | undefined };
      comment?: string | undefined;
    };

export const useCreateApiV2DomainsDomainRecords = (
  options: UseMutationOptions<
    UseCreateApiV2DomainsDomainRecordsResponse,
    Error,
    UseCreateApiV2DomainsDomainRecordsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2DomainsDomainRecordsArgs) =>
      apiFetch(
        buildUrl("/v2/domains/{domain}/records", {
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2DomainsDomainRecordsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["dns"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
