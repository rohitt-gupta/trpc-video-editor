import { prisma } from "@/server/prisma";
import { publicProcedure, router } from "../../trpc";
import { ZAddAd } from "./schema";

export const adRouter = router({
  getAds: publicProcedure.query(async () => {
    const ads = await prisma.ad.findMany();
    return ads;
  }),
  addAds: publicProcedure.input(ZAddAd).mutation(async (opts) => {
    const { adLength, adUrl, adTitle } = opts.input;
    const ad = await prisma.ad.create({
      data: {
        adUrl,
        adLength,
        adTitle,
      },
    });

    return ad.id;
  }),
});

export type AppRouter = typeof adRouter;
