import prismaClient from "../../prisma";

interface CreateMovimentacaoProps {
    label: string,
    type: string,
    valor: number,
    paymentType: string,
    date: string
}

class CreateMovimentacaoService {

    async execute({ label, type, valor, paymentType, date }: CreateMovimentacaoProps){

        const movimentacoes = await prismaClient.movimentacao.create({
            data: {
                label,
                type,
                valor,
                paymentType,
                date
            }
        })

        return movimentacoes
    }
}

export { CreateMovimentacaoService };
