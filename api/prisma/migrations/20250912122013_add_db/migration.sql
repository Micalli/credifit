-- CreateEnum
CREATE TYPE "public"."LoanStatus" AS ENUM ('requested', 'denied', 'approved', 'pending_payment', 'payment_failed');

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" VARCHAR NOT NULL,
    "convenio" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyRepresentative" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "nome" VARCHAR NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" VARCHAR NOT NULL,
    "passwordHash" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "nome" VARCHAR NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR NOT NULL,
    "passwordHash" VARCHAR NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Loan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "public"."LoanStatus" NOT NULL DEFAULT 'requested',
    "scoreChecked" INTEGER,
    "scorePayload" JSONB,
    "paymentGatewayResponse" JSONB,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoanInstallment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "dueDate" DATE NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LoanInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "public"."Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRepresentative_cpf_key" ON "public"."CompanyRepresentative"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRepresentative_email_key" ON "public"."CompanyRepresentative"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "public"."User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."CompanyRepresentative" ADD CONSTRAINT "CompanyRepresentative_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "public"."Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
