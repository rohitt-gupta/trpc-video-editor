import { z } from "zod";

export const ZAddAd = z.object({
  adTitle: z.string(),
  adLength: z.number(),
  adUrl: z.string(),
});

export type TAddAd = z.infer<typeof ZAddAd>;

export const ZDeleteAdMarker = z.object({
  id: z.number(),
});

export type TDeleteAdMarker = z.infer<typeof ZDeleteAdMarker>;
