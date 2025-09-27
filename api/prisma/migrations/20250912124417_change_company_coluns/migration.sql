/*
  Warnings:

  - You are about to drop the column `convenio` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `razaoSocial` on the `Company` table. All the data in the column will be lost.
  - Added the required column `arrangement` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "convenio",
DROP COLUMN "razaoSocial",
ADD COLUMN     "arrangement" BOOLEAN NOT NULL,
ADD COLUMN     "companyName" VARCHAR NOT NULL;
