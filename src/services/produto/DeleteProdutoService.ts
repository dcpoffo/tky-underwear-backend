import prismaClient from "../../prisma";

interface DeleteProdutoProps {
    id: string;
}

class DeleteProdutoService {

    async execute({ id }: DeleteProdutoProps) {

        if (!id) {
            throw new Error("Sem id não dá para excluir")
        }

        const findProduto = await prismaClient.produto.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findProduto) {
            throw new Error("Produto não existe")
        }

        await prismaClient.produto.delete({
            where:{
                id:  findProduto.id
            }
        })

        return { message: "Produto deletado com sucesso!" }

    }

}

export { DeleteProdutoService }