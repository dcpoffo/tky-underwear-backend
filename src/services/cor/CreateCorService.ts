import prismaClient from "../../prisma";

interface CreateCorProps {
    descricao: string
}

class CreateCorService {

        async execute({descricao}: CreateCorProps) {

            if (!descricao) {
                throw new Error("Preencha a descricção");
            }

            const cor = await prismaClient.cor.create({
                data: {
                    descricao
                }
            })

            return cor;
        }
}

export {CreateCorService}