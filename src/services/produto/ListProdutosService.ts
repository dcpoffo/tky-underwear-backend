import prismaClient from "../../prisma";

class ListProdutosService {
    async execute() {

        const produtos = await prismaClient.produto.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        return produtos;
    }
}

export { ListProdutosService }