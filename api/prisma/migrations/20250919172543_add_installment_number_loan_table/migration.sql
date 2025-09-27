/*
  Warnings:

  - Added the required column `installmentNumber` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Loan" ADD COLUMN     "installmentNumber" INTEGER NOT NULL;
