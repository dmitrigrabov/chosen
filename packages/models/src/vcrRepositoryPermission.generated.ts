import { z } from "zod";

export type VcrRepositoryPermission = {
  repositoryId: string;
  teamId: string;
  teamSlug: string;
  createdAt: string;
};

export const vcrRepositoryPermission = z.object({
  repositoryId: z.string(),
  teamId: z.string(),
  teamSlug: z.string(),
  createdAt: z.string(),
});
