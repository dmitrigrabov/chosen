import { type VcrRepository, vcrRepository } from "packages/models/src/vcrRepository.generated.ts";
import { z } from "zod";

export type VcrRepositoryList = {
  repositories: Array<VcrRepository>;
  nextCursor?: string | undefined;
};

export const vcrRepositoryList = z.object({
  repositories: z.array(vcrRepository),
  nextCursor: z.string().optional(),
});
