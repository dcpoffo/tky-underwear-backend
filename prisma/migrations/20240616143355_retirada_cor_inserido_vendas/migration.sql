/*
  Warnings:

  - You are about to drop the `cores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cores";

-- CreateTable
CREATE TABLE "venda" (
    "idVenda" SERIAL NOT NULL,
    "valorVenda" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("idVenda")
);

-- CreateTable
CREATE TABLE "itensVenda" (
    "idItemVenda" SERIAL NOT NULL,
    "idVenda" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "itensVenda_pkey" PRIMARY KEY ("idItemVenda")
);

-- AddForeignKey
ALTER TABLE "itensVenda" ADD CONSTRAINT "itensVenda_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensVenda" ADD CONSTRAINT "itensVenda_idVenda_fkey" FOREIGN KEY ("idVenda") REFERENCES "venda"("idVenda") ON DELETE RESTRICT ON UPDATE CASCADE;
