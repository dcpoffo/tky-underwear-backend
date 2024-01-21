import prismaClient from "../../prisma";

interface DeleteMovimentacaoProps {
    id: string;
}

class DeleteMovimentacaoService {

    async execute({ id }: DeleteMovimentacaoProps) {

        if (!id) {
            throw new Error("Sem id não dá para excluir")
        }

        const findMovimentacao = await prismaClient.movimentacao.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findMovimentacao) {
            throw new Error("Movimentação não existe")
        }

        await prismaClient.produto.delete({
            where:{
                id:  findMovimentacao.id
            }
        })

        return { message: "Movimentação deletada com sucesso!" }

    }

}

export { DeleteMovimentacaoService }