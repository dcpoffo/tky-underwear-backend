-- CreateTable
CREATE TABLE "movimentacoes" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "type" VARCHAR(1) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "movimentacoes_pkey" PRIMARY KEY ("id")
);
