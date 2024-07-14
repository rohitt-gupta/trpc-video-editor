import { prisma } from "@/server/prisma";
import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { ZAddAdMarker, ZDeleteAdMarker } from "./schema";

export const adMarkerRouter = router({
  getAdMarkers: publicProcedure.query(async () => {
    const adMarkers = await prisma.adMarker.findMany();
    return adMarkers;
  }),
  addAdMarker: publicProcedure.input(ZAddAdMarker).mutation(async (opts) => {
    const { type,adId, timestamp } = opts.input;
    await prisma.adMarker.create({
      data : {
        adId : adId,
        timestamp : timestamp,
        type : type
      }
    })
  }),
  deleteAdMarker: publicProcedure
    .input(ZDeleteAdMarker)
    .mutation(async (opts) => {
      const { id } = opts.input;
      try {
        await prisma.adMarker.delete({
          where: {
            id: id,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete ad marker",
        });
      }
    }),
});

export type AppRouter = typeof adMarkerRouter;
