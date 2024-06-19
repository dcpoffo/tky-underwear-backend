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
                    id: 'asc'
                }
            }
        );

        return vendas
    }
}

export { ListVendaService }