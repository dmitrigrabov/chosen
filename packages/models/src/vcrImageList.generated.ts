import {
  type VcrImageListItem,
  vcrImageListItem,
} from "packages/models/src/vcrImageListItem.generated.ts";
import { z } from "zod";

export type VcrImageList = { images: Array<VcrImageListItem>; nextCursor?: string | undefined };

export const vcrImageList = z.object({
  images: z.array(vcrImageListItem),
  nextCursor: z.string().optional(),
});
