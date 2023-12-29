import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateMovimentacaoService } from "../../services/movimentacao/CreateMovimentacaoService";

interface CreateMovimentacaoProps {
    label: string,
    type: string,
    valor: number,
    paymentType: string,
    date: string
}

class CreateMovimentacaoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { label, type, valor, paymentType, date } = request.body as CreateMovimentacaoProps;

        const movimentacaoService = new CreateMovimentacaoService();

        const movimentacao = await movimentacaoService.execute({ label, type, valor, paymentType, date });

        reply.send(movimentacao);
    }
}

export { CreateMovimentacaoController }
