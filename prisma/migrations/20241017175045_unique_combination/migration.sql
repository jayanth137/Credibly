/*
  Warnings:

  - A unique constraint covering the columns `[url,creatorId]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Videos_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Videos_url_creatorId_key" ON "Videos"("url", "creatorId");
