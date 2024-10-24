/*
  Warnings:

  - Made the column `description` on table `Videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tags` on table `Videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `validation` on table `Videos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Videos" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "validation" SET NOT NULL;
