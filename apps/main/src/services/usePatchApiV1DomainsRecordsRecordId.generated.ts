import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1DomainsRecordsRecordIdArgs = {
  recordId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name?: (string | null) | undefined;
    value?: (string | null) | undefined;
    type?:
      | (
          | "A"
          | "AAAA"
          | "ALIAS"
          | "CAA"
          | "CNAME"
          | "HTTPS"
          | "MX"
          | "SRV"
          | "TXT"
          | "NS"
          | "null"
          | null
        )
      | undefined;
    ttl?: (number | null) | undefined;
    mxPriority?: (number | null) | undefined;
    srv?:
      | ({
          target: string | null;
          weight: number | null;
          port: number | null;
          priority: number | null;
        } | null)
      | undefined;
    https?:
      | ({
          priority: number | null;
          target: string | null;
          params?: (string | null) | undefined;
        } | null)
      | undefined;
    comment?: string | undefined;
  };
};

export const usePatchApiV1DomainsRecordsRecordIdResponse = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["record", "record-sys"]),
  value: z.string(),
  creator: z.string(),
  domain: z.string(),
  ttl: z.number().optional(),
  comment: z.string().optional(),
  recordType: z.enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "NS", "SRV", "TXT"]),
  createdAt: z.number().nullable().optional(),
});

export type UsePatchApiV1DomainsRecordsRecordIdResponse = {
  id: string;
  name: string;
  type: "record" | "record-sys";
  value: string;
  creator: string;
  domain: string;
  ttl?: number | undefined;
  comment?: string | undefined;
  recordType: "A" | "AAAA" | "ALIAS" | "CAA" | "CNAME" | "HTTPS" | "MX" | "NS" | "SRV" | "TXT";
  createdAt?: (number | null) | undefined;
};

export type PatchApiV1DomainsRecordsRecordIdBody = {
  name?: (string | null) | undefined;
  value?: (string | null) | undefined;
  type?:
    | (
        | "A"
        | "AAAA"
        | "ALIAS"
        | "CAA"
        | "CNAME"
        | "HTTPS"
        | "MX"
        | "SRV"
        | "TXT"
        | "NS"
        | "null"
        | null
      )
    | undefined;
  ttl?: (number | null) | undefined;
  mxPriority?: (number | null) | undefined;
  srv?:
    | ({
        target: string | null;
        weight: number | null;
        port: number | null;
        priority: number | null;
      } | null)
    | undefined;
  https?:
    | ({
        priority: number | null;
        target: string | null;
        params?: (string | null) | undefined;
      } | null)
    | undefined;
  comment?: string | undefined;
};

export const usePatchApiV1DomainsRecordsRecordId = (
  options: UseMutationOptions<
    UsePatchApiV1DomainsRecordsRecordIdResponse,
    Error,
    UsePatchApiV1DomainsRecordsRecordIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1DomainsRecordsRecordIdArgs) =>
      apiFetch(
        buildUrl("/v1/domains/records/{recordId}", {
          recordId: args.recordId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1DomainsRecordsRecordIdResponse,
        {
          method: "PATCH",
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
