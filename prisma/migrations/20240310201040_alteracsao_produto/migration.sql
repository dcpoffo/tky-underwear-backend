/*
  Warnings:

  - Added the required column `grade` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelagem` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "grade" VARCHAR(3) NOT NULL,
ADD COLUMN     "modelagem" VARCHAR(8) NOT NULL,
ADD COLUMN     "tipo" VARCHAR(6) NOT NULL;
