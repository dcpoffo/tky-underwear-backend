import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateMovimentacaoService } from '../../services/movimentacao/UpdateMovimentacaoService';

interface UpdateMovimentacaoProps {
    label: string,
    type: string,
    valor: number,
    paymentType: string,
    date: string
}

class UpdateMovimentacaoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.query as { id: string }

        const { label, type, valor, paymentType, date } = request.body as UpdateMovimentacaoProps;

        const movimentacaoService = new UpdateMovimentacaoService();

        const movimentacao = await movimentacaoService.execute({ id, label, type, valor, paymentType, date });

        reply.send(movimentacao);
    }
}

export { UpdateMovimentacaoController }