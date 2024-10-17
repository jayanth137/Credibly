/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Links";

-- CreateTable
CREATE TABLE "Creator" (
    "youtubeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("youtubeId")
);

-- CreateTable
CREATE TABLE "Videos" (
    "cid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("cid")
);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("youtubeId") ON DELETE RESTRICT ON UPDATE CASCADE;
