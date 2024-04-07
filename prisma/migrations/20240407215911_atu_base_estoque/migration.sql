-- AlterTable
ALTER TABLE "movimentaEstoque" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "qtdEstoque" SET DEFAULT 0;
