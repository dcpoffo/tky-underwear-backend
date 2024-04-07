-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "qtdEstoque" INTEGER;

-- CreateTable
CREATE TABLE "movimentaEstoque" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(1) NOT NULL,
    "descricao" VARCHAR(7) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,

    CONSTRAINT "movimentaEstoque_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movimentaEstoque" ADD CONSTRAINT "movimentaEstoque_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
