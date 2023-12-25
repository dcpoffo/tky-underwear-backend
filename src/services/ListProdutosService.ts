import prismaClient from "../prisma";

class ListProdutosService {
    async execute() {

        const customers = await prismaClient.produto.findMany();

        return customers;
    }
}

export { ListProdutosService }