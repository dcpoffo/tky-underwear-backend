-- AlterTable
ALTER TABLE "movimentacaoEstoque" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "descricao" VARCHAR(100) NOT NULL DEFAULT 'Venda';
