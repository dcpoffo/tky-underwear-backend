import prismaClient from "../../prisma";

class ListMovimentacaoEstoqueService {
    async execute() {

        const movimentacoes = await prismaClient.movimentaEstoque.findMany(
            {
                include: {
                    produto: true,
                },
                orderBy: {
                    data: 'asc'
                }
            }
        );

        return movimentacoes;
    }
}

export { ListMovimentacaoEstoqueService }