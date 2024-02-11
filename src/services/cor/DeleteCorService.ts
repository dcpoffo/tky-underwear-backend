import prismaClient from "../../prisma";

interface DeleteCorProps {
    id: string;
}

class DeleteCorService {

    async execute({ id }: DeleteCorProps) {

        if (!id) {
            throw new Error("Sem id não dá para excluir")
        }

        const findCor = await prismaClient.cor.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findCor) {
            throw new Error("Cor não existe")
        }

        await prismaClient.produto.delete({
            where: {
                id: findCor.id
            }
        })

        return { message: "Cor deletada com sucesso!" }

    }

}

export { DeleteCorService }