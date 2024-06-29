/*
  Warnings:

  - You are about to drop the `movimentaEstoque` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movimentaEstoque" DROP CONSTRAINT "movimentaEstoque_idProduto_fkey";

-- DropTable
DROP TABLE "movimentaEstoque";

-- CreateTable
CREATE TABLE "movimentacaoEstoque" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(1) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimentacaoEstoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itensMovimentacaoEstoque" (
    "id" SERIAL NOT NULL,
    "idMovimentacaoEstoque" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "itensMovimentacaoEstoque_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itensMovimentacaoEstoque" ADD CONSTRAINT "itensMovimentacaoEstoque_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensMovimentacaoEstoque" ADD CONSTRAINT "itensMovimentacaoEstoque_idMovimentacaoEstoque_fkey" FOREIGN KEY ("idMovimentacaoEstoque") REFERENCES "movimentacaoEstoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
