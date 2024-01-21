import prismaClient from "../../prisma";

interface UpdateMovimentacaoProps {
    id: string,
    label: string,
    type: string,
    valor: number,
    paymentType: string,
    date: string
}

class UpdateMovimentacaoService {

    async execute({ id, label, type, valor, paymentType, date }: UpdateMovimentacaoProps) {

        if (!id) {
            throw new Error("Sem id não pode atualizar")
        }          
        
        const findMovimentacao = await prismaClient.movimentacao.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findMovimentacao) {
            throw new Error("Movimentação não existe")
        }  

        if (!label) {
            throw new Error("Preencha a descrição");
        }

        if (!type) {
            throw new Error("Tipo Entrada/Saida deve ser preenchido");
        }

        if (!valor) {
            throw new Error("Valor deve ser preenchido");
        }

        if (!paymentType) {
            throw new Error("Metodo de pagamento deve ser preenchido");
        }

        if (!date) {
            throw new Error("Data deve ser preenchida");
        }

        const movimentacao = await prismaClient.movimentacao.update({
            where: {
                id: findMovimentacao.id
            },

            data: {
                label,
                type,
                valor,
                paymentType,
                date
            }
        })

        return movimentacao
    }

}

export { UpdateMovimentacaoService }