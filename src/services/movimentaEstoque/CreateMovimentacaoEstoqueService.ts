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
            throw new Error(`Quantidade insufuciante em estoque! Quantidade em estoque: ${findProduto.qtdEstoque}`);
        }

        const movimentacoes = await prismaClient.movimentaEstoque.create({
            data: {
                idProduto,
                tipo,
                descricao,
                quantidade
            }
        })

        //nova quantidade a se movimentada no estoque
        var novaQuantidade = findProduto.qtdEstoque;
        if (tipo === "0") { // 0 - entrada
            novaQuantidade += quantidade;

        } else { // 1 - saida
            novaQuantidade -= quantidade;
        }
        
        //atualizar estoque
        const produto = await prismaClient.produto.update({
            where: {
                id: findProduto.id
            },

            data: {
                qtdEstoque: novaQuantidade
            }
        })

        return movimentacoes

    }
}

export { CreateMovimentacaoEstoqueService };

