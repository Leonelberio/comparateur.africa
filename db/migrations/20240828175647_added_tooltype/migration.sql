/*
  Warnings:

  - Added the required column `toolType` to the `Comparator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comparator" ADD COLUMN     "toolType" TEXT NOT NULL;
