import prismaClient from "../../prisma";

interface CreateVendaProps {
    valorVenda: number,
    itensVenda: ItensVendaProps[]
}

interface ItensVendaProps {
    idProduto: number,
    quantidade: number,
    valorUnitario: number,
    total: number
}

class CreateVendaService {

    async execute({ valorVenda, itensVenda }: CreateVendaProps) {

        // Verificar se todos os produtos existem
        for (const item of itensVenda) {
            const findProduto = await prismaClient.produto.findUnique({
                where: {
                    id: item.idProduto,
                },
            });

            if (!findProduto) {
                throw new Error(`Produto com Código ${item.idProduto} não existe`);
            }

            if (item.quantidade === 0) {
                throw new Error(`No produto com Código ${item.idProduto} não foi informada a quantidade!`)
            }

            if (findProduto.qtdEstoque < item.quantidade) {
                throw new Error(`Produto com Código ${item.idProduto} não tem quantidade suficiente em estoque. Quantidade em estoque: ${findProduto.qtdEstoque}`);
            }
        }

        const vendas = await prismaClient.venda.create({
            data: {
                valorVenda,
                itensDaVenda: {
                    create: itensVenda.map(item => ({
                        idProduto: item.idProduto,
                        quantidade: item.quantidade,
                        valorUnitario: item.valorUnitario,
                        total: (item.quantidade * item.valorUnitario)
                    }))
                }
            },
            include: { itensDaVenda: true },
        });

        // Atualizar o estoque dos produtos
        for (const item of itensVenda) {
            await prismaClient.produto.update({
                where: {
                    id: item.idProduto
                },
                
                data: {
                    qtdEstoque: {
                        decrement: item.quantidade,
                    },
                },
            });
        }

        //lançar movimentação de saida do estoque

        return vendas;
    }
}

export { CreateVendaService }