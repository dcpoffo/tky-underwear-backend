import prismaClient from "../../prisma";

interface UpdateProdutoProps {
    id: string,
    descricao: string,
    qtd_minima: number,
    barra: string
}


class UpdateProdutoService {

    async execute({ id, descricao, qtd_minima, barra }: UpdateProdutoProps) {

        if (!id) {
            throw new Error("Sem id não pode atualizar")
        }

        const findProduto = await prismaClient.produto.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findProduto) {
            throw new Error("Produto não existe")
        }       
        
        if (!descricao) {
            throw new Error("Preencha a descrição");
        }

        if (!qtd_minima) {
            qtd_minima = 0;
        }

        if (!barra) {
            barra = "0";
        }

        const produto = await prismaClient.produto.update({
            where: {
                id: findProduto.id
            },

            data: {
                descricao,
                qtd_minima,
                barra
            }
        })

        return produto
    }

}

export { UpdateProdutoService }