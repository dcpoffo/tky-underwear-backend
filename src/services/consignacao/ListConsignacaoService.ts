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
                    id: 'asc'
                }
            }
        );
        
        return vendas
    };
}

export { ListConsignacaoService }