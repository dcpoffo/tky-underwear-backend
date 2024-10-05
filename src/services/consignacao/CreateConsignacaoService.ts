import prismaClient from "../../prisma";

interface CreateConsignacaoProps {
    descricao: string,
    itensConsignacao: ItensConsignacaoProps[]
}

interface ItensConsignacaoProps {
    idProduto: number,
    quantidade: number
}

class CreateConsignacaoService {

    async execute({ descricao, itensConsignacao }: CreateConsignacaoProps) {
        try {
            for (const item of itensConsignacao) {
                const findProduto = await prismaClient.produto.findUnique({
                    where: {
                        id: item.idProduto,
                    }
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

            const vendas = await prismaClient.consignacao.create({
                data: {
                    descricao,
                    itensConsignacao: {
                        create: itensConsignacao.map(item => ({
                            idProduto: item.idProduto,
                            quantidade: item.quantidade
                        }))
                    }
                },
                include: {
                    itensConsignacao: true
                },
            });
            console.log("venda consignada criada")

            const movimentacao = await prismaClient.movimentacaoEstoque.create({
                data: {
                    tipo: "1",
                    descricao: `Ref. venda consignada: ${vendas.id}\n${descricao}`,
                    itensMovimentacaoEstoque: {
                        create: itensConsignacao.map(item => ({
                            idProduto: item.idProduto,
                            quantidade: item.quantidade
                        }))
                    }
                },
                include: {
                    itensMovimentacaoEstoque: true
                },
            });
            console.log("Movimentação criada")

            // Atualizar o estoque dos produtos
            for (const item of itensConsignacao) {
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
            console.log("Estoque atualizado")

            return vendas;

        } catch (error) {
            console.log("Erro ao cadastrar venda consignada: ", error);
            throw error; // Lança o erro para ser tratado no lado do cliente
        }
    }

}

export { CreateConsignacaoService }