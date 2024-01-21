import prismaClient from "../../prisma";

class ListProdutosService {
    async execute() {

        const customers = await prismaClient.produto.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        return customers;
    }
}

export { ListProdutosService }