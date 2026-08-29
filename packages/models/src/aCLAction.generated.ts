import { z } from "zod";

export type ACLAction = "create" | "delete" | "list" | "read" | "update";

export const aCLAction = z.enum(["create", "delete", "list", "read", "update"]);
