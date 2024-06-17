import prismaClient from "../../prisma";

interface CreateMovimentaEstoqueProps {
    idProduto: number,
    tipo: string,
    descricao: string,
    quantidade: number;
}

class CreateMovimentacaoEstoqueService {

    async execute({ idProduto, tipo, descricao, quantidade }: CreateMovimentaEstoqueProps) {

        const findProduto = await prismaClient.produto.findFirst({
            where: {
                id: Number(idProduto)
            }
        })

        if (!findProduto) {
            throw new Error("Produto não existe")
        }

        if (quantidade === 0) {
            throw new Error("Quantidade não pode ser 0!")
        }

        if (tipo === "1" && quantidade > findProduto.qtdEstoque) {
            throw new Error(`Quantidade insuficiente em estoque! Quantidade em estoque: ${findProduto.qtdEstoque}`);
        }

        const movimentacoes = await prismaClient.movimentaEstoque.create({
            data: {
                idProduto,
                tipo,
                descricao,
                quantidade
            }
        })      

        //atualizar estoque dependendo do tipo
        if (tipo === "0") { // 0 - entrada

            const produto = await prismaClient.produto.update({
                where: {
                    id: findProduto.id
                },

                data: {
                    qtdEstoque: {
                        increment: quantidade
                    }
                }
            })

        } else { // 1 - saida

            const produto = await prismaClient.produto.update({
                where: {
                    id: findProduto.id
                },

                data: {
                    qtdEstoque: {
                        decrement: quantidade
                    }
                }
            })
        }

        return movimentacoes

    }
}

export { CreateMovimentacaoEstoqueService };

