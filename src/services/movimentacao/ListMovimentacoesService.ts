import prismaClient from "../../prisma";

class ListMovimentacoesService {
    async execute() {

        const customers = await prismaClient.movimentacao.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        return customers;
    }
}

export { ListMovimentacoesService }