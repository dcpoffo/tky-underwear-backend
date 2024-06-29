import prismaClient from "../../prisma";

class ListMovimentacaoEstoqueService {
    async execute() {

        const movimentacoes = await prismaClient.movimentacaoEstoque.findMany(
            {
                include: {
                    itensMovimentacaoEstoque: {
                        include: {
                            produto: true
                        }
                    }
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