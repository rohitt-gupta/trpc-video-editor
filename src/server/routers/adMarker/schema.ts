import { z } from "zod";

export const ZAddAdMarker = z.object({
  type: z.enum(["ABTEST", "AUTO", "STATIC"]),
  adId: z.number(),
  timestamp: z.string(),
});

export type TAddAdMarker = z.infer<typeof ZAddAdMarker>;

export const ZEditAdMarker = z.object({
  timestamp: z.string(),
  id: z.number(),
});

export type TEditAdMarker = z.infer<typeof ZEditAdMarker>;

export const ZDeleteAdMarker = z.object({
  id: z.number(),
});

export type TDeleteAdMarker = z.infer<typeof ZDeleteAdMarker>;
