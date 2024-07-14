import { adMarkerRouter } from "./routers/adMarker";
import { adRouter } from "./routers/ads";
import { router } from "./trpc";

export const appRouter = router({
  adRoutes: adRouter,
  adMarkerRoutes: adMarkerRouter,
});

export type AppRouter = typeof appRouter;
