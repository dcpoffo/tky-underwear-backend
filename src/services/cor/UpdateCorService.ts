import prismaClient from "../../prisma";

interface UpdateCorProps {
    id: string,
    descricao: string
}

class UpdateCorService {

    async execute({ id, descricao}: UpdateCorProps) {
        
        if (!id) {
            throw new Error("Sem id não dá pra atualizar")
        }
        
        const findCor = await prismaClient.cor.findFirst({
            where: {
                id: Number(id)
            }
        })
        
        if (!findCor) {
            throw new Error("Cor não existe")
        }


        if (!descricao) {
            throw new Error("Preencha a descrição");
        }

        const cor = await prismaClient.cor.update({
            where: {
                id: findCor.id
            },

            data: {
                descricao
            }
        })
    }
}

export { UpdateCorService}