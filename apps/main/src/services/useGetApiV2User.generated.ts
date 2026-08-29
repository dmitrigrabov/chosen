import { authUser } from "packages/models/src/authUser.generated.ts";
import { authUserLimited } from "packages/models/src/authUserLimited.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseGetApiV2UserArgs = Record<string, never>;

export const useGetApiV2UserResponse = z.object({ user: z.union([authUser, authUserLimited]) });

export const getApiV2UserQueryOptions = () =>
  queryOptions({
    queryKey: ["GET /v2/user", "user"],
    queryFn: () => apiFetch("/v2/user", useGetApiV2UserResponse, { method: "GET" }),
  });

export const useGetApiV2User = () => useQuery(getApiV2UserQueryOptions());
