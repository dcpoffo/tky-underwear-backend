import prismaClient from "../../prisma";

class ListProdutosService {
    async execute() {

        const produtos = await prismaClient.produto.findMany(
            {
                orderBy: [
                    { descricao: 'asc' },
                    { modelagem: 'asc' },
                    { tipo: 'asc' },
                    { id: 'asc' }
                ],
            }
        );

        return produtos;
    }
}

export { ListProdutosService }