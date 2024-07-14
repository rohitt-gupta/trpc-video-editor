/*
  Warnings:

  - A unique constraint covering the columns `[adId]` on the table `AdMarker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adUrl` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adId` to the `AdMarker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "adUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AdMarker" ADD COLUMN     "adId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdMarker_adId_key" ON "AdMarker"("adId");

-- AddForeignKey
ALTER TABLE "AdMarker" ADD CONSTRAINT "AdMarker_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
