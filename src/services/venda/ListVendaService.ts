import prismaClient from "../../prisma"

class ListVendaService {
    async execute() {

        const vendas = await prismaClient.venda.findMany(
            {
                include: {
                    itensDaVenda: {
                        include: {
                            produto: true
                        }
                    }
                },
                orderBy: {
                    data: 'desc'
                }
            }
        );

        return vendas
    }
}

export { ListVendaService }