import prismaClient from "../../prisma";

interface UpdateProdutoProps {
    id: string,
    descricao: string,
    barra: string
}


class UpdateProdutoService {

    async execute({ id, descricao, barra }: UpdateProdutoProps) {

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

        if (!barra) {
            barra = "0";
        }

        const produto = await prismaClient.produto.update({
            where: {
                id: findProduto.id
            },

            data: {
                descricao,
                barra
            }
        })

        return produto
    }

}

export { UpdateProdutoService }