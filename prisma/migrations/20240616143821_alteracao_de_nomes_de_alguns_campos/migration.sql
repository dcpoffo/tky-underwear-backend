/*
  Warnings:

  - The primary key for the `itensVenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idItemVenda` on the `itensVenda` table. All the data in the column will be lost.
  - The primary key for the `venda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idVenda` on the `venda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "itensVenda" DROP CONSTRAINT "itensVenda_idVenda_fkey";

-- AlterTable
ALTER TABLE "itensVenda" DROP CONSTRAINT "itensVenda_pkey",
DROP COLUMN "idItemVenda",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "itensVenda_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "venda" DROP CONSTRAINT "venda_pkey",
DROP COLUMN "idVenda",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "venda_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "itensVenda" ADD CONSTRAINT "itensVenda_idVenda_fkey" FOREIGN KEY ("idVenda") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
