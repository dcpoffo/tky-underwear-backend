import prismaClient from "../../prisma";

class ListMovimentacaoEstoqueService {
    async execute() {

        const movimentacoes = await prismaClient.movimentaEstoque.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        return movimentacoes;
    }
}

export { ListMovimentacaoEstoqueService }