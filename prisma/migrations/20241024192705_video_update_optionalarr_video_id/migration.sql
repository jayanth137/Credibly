/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `videoId` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "videoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Videos_videoId_key" ON "Videos"("videoId");
