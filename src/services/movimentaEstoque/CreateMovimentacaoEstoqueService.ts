import { error } from "console";
import prismaClient from "../../prisma";

interface CreateMovimentacaoEstoqueProps {
    tipo: string,
    descricao: string,
    itensMovimentacaoEstoque: ItensMovimentacaoEstoqueProps[]
}

interface ItensMovimentacaoEstoqueProps {
    idProduto: number,
    quantidade: number
}

class CreateMovimentacaoEstoqueService {

    async execute({ tipo, descricao, itensMovimentacaoEstoque }: CreateMovimentacaoEstoqueProps) {

        try {
            // verifica se todos os produtos existem e tem estoque suciente
            for (const item of itensMovimentacaoEstoque) {
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

                if ((tipo === "1") && (findProduto.qtdEstoque < item.quantidade)) {
                    throw new Error(`Produto com Código ${item.idProduto} não tem quantidade suficiente em estoque. Quantidade em estoque: ${findProduto.qtdEstoque}`);
                }
            }

            const movimentacoes = await prismaClient.movimentacaoEstoque.create({
                data: {
                    tipo,
                    descricao,
                    itensMovimentacaoEstoque: {
                        create: itensMovimentacaoEstoque.map(item => ({
                            idProduto: item.idProduto,
                            quantidade: item.quantidade
                        }))
                    }
                },
                include: {
                    itensMovimentacaoEstoque: true
                },
            });

            //atualizar estoque dependendo do tipo
            if (tipo === "0") { // 0 - entrada
                for (const item of itensMovimentacaoEstoque) {
                    await prismaClient.produto.update({
                        where: {
                            id: item.idProduto
                        },
                        data: {
                            qtdEstoque: {
                                increment: item.quantidade,
                            }
                        }
                    })
                }
            } else { // 1 - saida
                for (const item of itensMovimentacaoEstoque) {
                    await prismaClient.produto.update({
                        where: {
                            id: item.idProduto
                        },
                        data: {
                            qtdEstoque: {
                                decrement: item.quantidade,
                            }
                        }
                    })
                }
            }

            return movimentacoes;

        } catch (error) {
            console.log("Erro ao realizar movimentação: ", error);
            throw error;
        }
    }
}

export { CreateMovimentacaoEstoqueService };

