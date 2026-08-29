import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreArgs = {
  edgeConfigId: string;
  edgeConfigBackupVersionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse =
  z.object({
    status: z.literal("ok"),
    restoredFrom: z.string(),
    previousDigest: z.string(),
    digest: z.string(),
  });

export type UseCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse =
  { status: "ok"; restoredFrom: string; previousDigest: string; digest: string };

export type CreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreBody = void;

export const useCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestore = (
  options: UseMutationOptions<
    UseCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse,
    Error,
    UseCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UseCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}/restore", {
          edgeConfigId: args.edgeConfigId,
          edgeConfigBackupVersionId: args.edgeConfigBackupVersionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1GlobalConfigEdgeConfigIdBackupsEdgeConfigBackupVersionIdRestoreResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["global-config"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
