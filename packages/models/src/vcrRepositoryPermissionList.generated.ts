import {
  type VcrRepositoryPermission,
  vcrRepositoryPermission,
} from "packages/models/src/vcrRepositoryPermission.generated.ts";
import { z } from "zod";

export type VcrRepositoryPermissionList = {
  permissions: Array<VcrRepositoryPermission>;
  nextCursor?: string | undefined;
};

export const vcrRepositoryPermissionList = z.object({
  permissions: z.array(vcrRepositoryPermission),
  nextCursor: z.string().optional(),
});
