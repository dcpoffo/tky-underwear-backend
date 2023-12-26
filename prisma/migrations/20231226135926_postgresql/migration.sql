-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "qtd_minima" INTEGER DEFAULT 0,
    "barra" VARCHAR(13),

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);
