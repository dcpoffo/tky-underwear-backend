import prismaClient from "../../prisma"

class ListConsignacaoService {
    async execute() {

        const vendas = await prismaClient.consignacao.findMany(
            {
                include: {
                    itensConsignacao: {
                        include: {
                            produto: true,
                        }
                    }
                },
                orderBy: {
                    data: 'desc'
                }
            }
        );

        return vendas
    };
}

export { ListConsignacaoService }