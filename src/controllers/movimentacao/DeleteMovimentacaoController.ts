import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteMovimentacaoService } from '../../services/movimentacao/DeleteMovimentacaoService';


class DeleteMovimentacaoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const movimentacaoService = new DeleteMovimentacaoService();

        const movimentacao = await movimentacaoService.execute({ id })

        reply.send(movimentacao);

    }

}

export { DeleteMovimentacaoController }