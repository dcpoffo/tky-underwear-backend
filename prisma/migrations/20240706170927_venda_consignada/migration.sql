-- AlterTable
ALTER TABLE "movimentacaoEstoque" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(200);

-- CreateTable
CREATE TABLE "consignacao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL DEFAULT 'Venda',
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consignacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItensConsignacao" (
    "id" SERIAL NOT NULL,
    "idConsignacao" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "ItensConsignacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItensConsignacao" ADD CONSTRAINT "ItensConsignacao_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensConsignacao" ADD CONSTRAINT "ItensConsignacao_idConsignacao_fkey" FOREIGN KEY ("idConsignacao") REFERENCES "consignacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
