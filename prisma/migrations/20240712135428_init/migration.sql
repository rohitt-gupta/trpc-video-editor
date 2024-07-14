/*
  Warnings:

  - You are about to drop the column `endTime` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Ad` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AdMarkerType" AS ENUM ('ABTEST', 'AUTO', 'STATIC');

-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- CreateTable
CREATE TABLE "AdMarker" (
    "id" SERIAL NOT NULL,
    "type" "AdMarkerType" NOT NULL DEFAULT 'ABTEST',
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "AdMarker_pkey" PRIMARY KEY ("id")
);
