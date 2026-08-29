import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiDomainsRecordsRecordIdArgs = { recordId: string };

export const useGetApiDomainsRecordsRecordIdResponse = z.object({
  type: z.enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "NS", "SRV", "TXT"]),
  id: z.string(),
  name: z.string(),
  value: z.string(),
  creator: z.string(),
  domain: z.string(),
  ttl: z.number().optional(),
  comment: z.string().optional(),
  recordType: z.enum(["A", "AAAA", "ALIAS", "CAA", "CNAME", "HTTPS", "MX", "NS", "SRV", "TXT"]),
  createdAt: z.number().nullable().optional(),
});

export const getApiDomainsRecordsRecordIdQueryOptions = (
  args: UseGetApiDomainsRecordsRecordIdArgs,
) =>
  queryOptions({
    queryKey: ["GET /domains/records/{recordId}", args.recordId],
    queryFn: () =>
      apiFetch(
        buildUrl("/domains/records/{recordId}", { recordId: args.recordId }),
        useGetApiDomainsRecordsRecordIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiDomainsRecordsRecordId = (args: UseGetApiDomainsRecordsRecordIdArgs) =>
  useQuery(getApiDomainsRecordsRecordIdQueryOptions(args));
