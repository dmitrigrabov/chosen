import { z } from "zod";

export type AiGatewayProviderOptionBag = Record<string, unknown>;

export const aiGatewayProviderOptionBag = z.record(z.string(), z.unknown());
