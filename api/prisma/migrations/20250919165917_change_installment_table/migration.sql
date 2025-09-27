/*
  Warnings:

  - You are about to drop the column `paymentGatewayResponse` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `scoreChecked` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `scorePayload` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextDueDate` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Loan" DROP COLUMN "paymentGatewayResponse",
DROP COLUMN "scoreChecked",
DROP COLUMN "scorePayload",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "nextDueDate" TIMESTAMP(3) NOT NULL;
